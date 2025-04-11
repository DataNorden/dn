import type { Stats } from 'fs';
import { WalkdirController } from '../types/WalkdirController';
import fs from 'fs-extra';
import { walkdir } from '@dn/fs/walkdir';
import { PathFilter } from '@dn/fs/path-filter';
import { isText } from 'node_modules/istextorbinary/source';
import { WalkdirSearchOptions } from '../types/WalkdirSearchOptions';

export async function walkdirSearch(
  dir: string,
  callback: (
    path: string,
    stat: Stats,
    controller: WalkdirController<string[]>,
    results: string[],
  ) => (void | string[]) | Promise<void | string[]>,
  options: WalkdirSearchOptions = {},
) {
  const contentFilter =
    typeof options.content === 'function'
      ? options.content
      : options.content
        ? PathFilter((o) => o.path(options.content!))
        : undefined;

  const results: string[] = [];

  const retval = await walkdir.iterate<string[]>(
    dir,
    async (filepath, stats, controller) => {
      if (options.maxResults && results.length > options.maxResults) return results;

      if (!contentFilter || !stats.isFile()) {
        results.push(filepath);
        return;
      }
      if (!isText(filepath)) return;
      if (options.maxSize && stats.size > options.maxSize * 1024) return;

      let code = '';
      try {
        const buf = await fs.readFile(filepath);
        if (!isText(null, buf)) return;
        code = buf.toString();
      } catch (error) {
        return;
      }

      if (!contentFilter(code)) {
        return;
      }

      const lines = code.split('\n');
      const lineIndex = lines.findIndex((line) => contentFilter(line));
      const lineNum = lineIndex + 1;
      if (lineNum) {
        filepath += ':' + lineNum;
      }
      results.push(filepath);

      return await callback(filepath, stats, controller, results);
    },
    {
      ...options,
      types: ['File'],
    },
  );

  return retval ?? results;
}

// function words(str: string | string[]) {
//   return [str]
//     .flat()
//     .join(' ')
//     .split(' ')
//     .map((s) => s.trim())
//     .filter((s) => !!s);
// }

// function hasUpperCase(str: string) {
//   return str.toLowerCase() !== str;
// }

// function escapeKeyword(kw: string) {
//   if (!kw.startsWith('or:')) {
//     return escapeRegExp(kw);
//   }
//   kw = kw.replace('or:', '');
//   return kw
//     .split('|')
//     .map((s) => escapeRegExp(s))
//     .join('|');
// }

// function flatten(...args: Arrayable<string | undefined>[]) {
//   return args.flat(10).filter((s) => s !== undefined);
// }

// function keywordsToRegex(keywords: string[], insensitive: string) {
//   return keywords.map((kw) => new RegExp(escapeKeyword(kw), insensitive));
// }
