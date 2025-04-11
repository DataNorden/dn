import path from 'upath';

export function toRelativePath(fspath: string) {
  return path.isAbsolute(fspath) ? path.relative(process.cwd(), fspath) : fspath;
}
