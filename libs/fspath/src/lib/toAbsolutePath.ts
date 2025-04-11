import path from 'upath';

export function toAbsolutePath(fspath: string) {
  return path.isAbsolute(fspath) ? fspath : path.join(process.cwd(), ...fspath.split('/'));
}
