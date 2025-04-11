import { WalkdirOptions } from '../types/WalkdirOptions';
import { walkdirEntriesSync } from './walkdirEntriesSync';

/**
 * Read filesystem directory contents recursively.
 * Returns an array of paths.
 *
 * @remarks
 * The provided 'dirpath' can be either a relative or absolute path.
 * All path results match this configuration.
 */
export function walkdirPathsSync(dirpath: string, options: WalkdirOptions = {}) {
  return walkdirEntriesSync(dirpath, options).map(([fspath]) => fspath);
}
