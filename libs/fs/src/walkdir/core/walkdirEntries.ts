import type { Stats } from 'fs';
import { WalkdirOptions } from '../types/WalkdirOptions';
import { walkdirIterate } from './walkdirIterate';

/**
 * Read filesystem directory contents recursively.
 * Returns an array of entries: [path, Stats][]
 *
 * @remarks
 * The provided 'dirpath' can be either a relative or absolute path.
 * All path results match this configuration.
 */
export async function walkdirEntries(
  dirpath: string,
  options: WalkdirOptions = {},
): Promise<[string, Stats][]> {
  const entries: [string, Stats][] = [];
  await walkdirIterate(
    dirpath,
    (fspath, stats) => {
      entries.push([fspath, stats]);
    },
    options,
  );
  return entries.sort();
}
