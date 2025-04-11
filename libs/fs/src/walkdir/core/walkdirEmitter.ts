import { NotUndefined } from '@dn/types';
import { toAbsolutePath } from '@dn/fspath/toAbsolutePath';
import WALKDIR from 'walkdir';
import { createPathTypePredicate } from '../../path-filter/util/createPathTypePredicate';
import { PathStatFilter } from '../../path-filter/core/PathStatFilter';
import { WalkdirOptions } from '../types/WalkdirOptions';
import { WalkdirEmitter } from '../types/WalkdirEmitter';
import { handleOptions } from '../util/handleOptions';
import { createNormalizer } from '../util/createNormalizer';

/**
 * Read filesystem directory contents recursively.
 * Returns an EventEmitter.
 * Use controller to pause, resume, and more methods available.
 *
 * @remarks
 * The provided 'dirpath' can be either a relative or absolute path.
 * All path results match this configuration.
 */
export function walkdirEmitter<Ret extends NotUndefined>(
  dirpath: string,
  options: WalkdirOptions = {},
): WalkdirEmitter<Ret> {
  const normalize =
    typeof options.normalize === 'function'
      ? options.normalize
      : createNormalizer(options.normalize ?? dirpath);

  const outputFilter =
    options.filterPaths || options.filterNames
      ? PathStatFilter((o) => {
          if (options.filterNames) o.basename(options.filterNames);
          if (options.filterPaths) o.path(options.filterPaths);
        })
      : () => true;

  const isAcceptedType = options.types?.length
    ? createPathTypePredicate(options.types)
    : () => true;

  const emitter = WALKDIR(toAbsolutePath(dirpath), {
    ...handleOptions(options, normalize),
    no_return: true,
  }) as WALKDIR.WalkEmitter & WalkdirEmitter<Ret>;

  let retval: Ret | undefined = undefined;

  emitter.return = (value?: Ret) => {
    retval = value;
    emitter.end();
  };

  emitter.awaitReturn = async () => {
    return await new Promise<void | Ret>((resolve, reject) => {
      emitter.once('error', reject);
      emitter.once('return', resolve);
    });
  };

  emitter.on('path', (fspath, stats) => {
    if (isAcceptedType(stats)) {
      fspath = normalize(fspath);
      if (outputFilter(fspath, stats)) {
        emitter.emit('data', fspath, stats, emitter);
      }
    }
  });

  emitter.on('fail', (fspath, error) => {
    emitter.emit('warn', normalize(fspath), error, emitter);
  });

  emitter.once('end', () => {
    emitter.emit('return', retval);
  });

  return emitter as WalkdirEmitter<Ret>;
}
