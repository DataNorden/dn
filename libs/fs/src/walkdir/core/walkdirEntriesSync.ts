import type { Stats } from 'fs';
import WALKDIR from 'walkdir';
import { PathStatFilter } from '../../path-filter/core/PathStatFilter';
import { toAbsolutePath } from '@dn/fspath/toAbsolutePath';
import { WalkdirOptions } from '../types/WalkdirOptions';
import { handleOptions } from '../util/handleOptions';
import { createNormalizer } from '../util/createNormalizer';

/**
 * Read filesystem directory contents recursively.
 * Returns an array of entries: [path, Stats][]
 *
 * @remarks
 * The provided 'dirpath' can be either a relative or absolute path.
 * All path results match this configuration.
 */
export function walkdirEntriesSync(
  dirpath: string,
  options: WalkdirOptions = {},
): [string, Stats][] {
  const normalize =
    typeof options.normalize === 'function'
      ? options.normalize
      : createNormalizer(options.normalize ?? dirpath);

  const outputFilter = options.filterPaths
    ? PathStatFilter((o) => o.path(options.filterPaths!))
    : () => true;

  const res = WALKDIR.sync(toAbsolutePath(dirpath), {
    ...handleOptions(options, normalize),
    no_return: false,
    return_object: true,
  });

  return Object.entries(res)
    .map(([p, s]) => [normalize(p), s] as [string, Stats])
    .filter(([fspath, stats]) => {
      return outputFilter(fspath, stats);
    })
    .sort();
}
