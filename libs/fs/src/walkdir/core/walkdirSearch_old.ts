import fs from 'fs-extra';
import escapeRegExp from 'lodash/escapeRegExp';
import { walkdir } from '@dn/fs/walkdir';
import { PathFilter } from '@dn/fs/path-filter';
import { Arrayable } from '@dn/types';

function hasUpperCase(str: string) {
  return str.toLowerCase() !== str;
}

function escapeKeyword(kw: string) {
  if (!kw.startsWith('or:')) {
    return escapeRegExp(kw);
  }
  kw = kw.replace('or:', '');
  return kw
    .split('|')
    .map((s) => escapeRegExp(s))
    .join('|');
}

function flatten(...args: Arrayable<string | undefined>[]) {
  return args.flat(10).filter((s) => s !== undefined);
}

function keywordsToRegex(keywords: string[], insensitive: string) {
  return keywords.map((kw) => new RegExp(escapeKeyword(kw), insensitive));
}

export async function walkdirSearch(
  dir: string,
  options: {
    fileExtensions?: Arrayable<string>;
    fileBasenameKeywords?: Arrayable<string>;
    filePathKeywords?: Arrayable<string>;
    fileContentKeywords?: Arrayable<string>;
    ignoreCase?: boolean;
    debug?: boolean;
  },
) {
  const fileExtensions = options.fileExtensions
    ? words([options.fileExtensions].flat().join(' ')).map((e) => {
        return e.startsWith('.') ? e : '.' + e;
      })
    : [];
  const filePathKeywords = flatten(options.filePathKeywords);
  const fileBasenameKeywords = flatten(options.fileBasenameKeywords);
  const fileContentKeywords = flatten(options.fileContentKeywords);

  const insensitive =
    options.ignoreCase === true
      ? 'i'
      : options.ignoreCase === false
        ? ''
        : flatten(
              fileExtensions,
              filePathKeywords,
              fileBasenameKeywords,
              fileContentKeywords,
            ).some(hasUpperCase)
          ? ''
          : 'i';

  const extsRegex = fileExtensions.length
    ? new RegExp(`^(${fileExtensions.map((s) => escapeRegExp(s)).join('|')})$`, insensitive)
    : undefined;
  const pathRegex = keywordsToRegex(filePathKeywords, insensitive);
  const nameRegex = keywordsToRegex(fileBasenameKeywords, insensitive);
  const codeRegex = keywordsToRegex(fileContentKeywords, insensitive);

  if (options.debug) {
    console.debug({
      dir,
      fileExtensions,
      fileBasenameKeywords,
      filePathKeywords,
      fileContentKeywords,
      insensitive,
      pathRegex,
      extsRegex,
      nameRegex,
      codeRegex,
    });
    console.debug('-------------');
  }

  const t0 = Date.now();

  await walkdir.iterate(
    dir,
    async (filepath) => {
      try {
        if (codeRegex.length) {
          const code = await fs.readFile(filepath, 'utf8');
          if (!codeRegex.every((re) => re.test(code))) {
            return;
          }
          const lines = code.split('\n');
          for (const re of codeRegex) {
            const lineIndex = lines.findIndex((line) => re.test(line));
            const lineNum = lineIndex + 1;
            if (lineNum) {
              filepath += ':' + lineNum;
              break;
            }
          }
        }
        console.log(filepath);
      } catch (error) {
        return;
      }
    },
    {
      types: ['File'],
      skipDirpaths: PathFilter((o) => {
        o.basename('{node_modules,.dist,appdata,coverage,.git,integration-test-data}');
      }),
      filterPaths: PathFilter((o) => {
        if (extsRegex) o.ext(extsRegex);
        if (nameRegex.length) o.basename(nameRegex);
        if (pathRegex.length) o.path(pathRegex);
      }),
    },
  );

  const elapsed = Date.now() - t0;

  if (options.debug) {
    setTimeout(() => {
      console.debug('-------------');
      console.debug({ elapsed });
    }, 15);
  }
}

function words(str: string | string[]) {
  return [str]
    .flat()
    .join(' ')
    .split(' ')
    .map((s) => s.trim())
    .filter((s) => !!s);
}
