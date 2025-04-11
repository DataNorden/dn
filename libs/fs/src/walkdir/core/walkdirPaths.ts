import { WalkdirOptions } from '../types/WalkdirOptions';
import { walkdirIterate } from './walkdirIterate';

/**
 * Read filesystem directory contents recursively.
 * Returns an array of paths.
 *
 * @remarks
 * The provided 'dirpath' can be either a relative or absolute path.
 * All path results match this configuration.
 */
export async function walkdirPaths(dirpath: string, options: WalkdirOptions = {}) {
  const paths: string[] = [];
  await walkdirIterate(
    dirpath,
    (fspath) => {
      paths.push(fspath);
    },
    options,
  );
  return paths.sort();
}
