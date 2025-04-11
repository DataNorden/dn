import fs from 'fs-extra';
import { PathNormalizer } from '../../path-filter/types';
import { PathFilter } from '../../path-filter/core/PathFilter';
import { WalkdirOptions } from '../types/WalkdirOptions';
import { deleteNullishPropsMutable } from '@dn/object/deleteNullishPropsMutable';

/**
 * Converts options into options type from 'walkdir' npm package.
 */
export function handleOptions(options: WalkdirOptions, normalize: PathNormalizer) {
  const skip =
    options.skipDirpaths || options.skipDirnames
      ? PathFilter((o) => {
          if (options.skipDirnames) o.basename(options.skipDirnames!);
          if (options.skipDirpaths) o.path(options.skipDirpaths!);
        })
      : undefined;

  return deleteNullishPropsMutable({
    fs: fs,
    follow_symlinks: options.followSymlinks,
    track_inodes: options.noInodeTracking ? false : undefined,
    max_depth: options.maxDepth,
    filter: skip
      ? (directory: string, files: string[]) => {
          directory = normalize(directory);
          if (!directory) return files;
          return skip(directory) ? [] : files;
        }
      : undefined,
  });
}
