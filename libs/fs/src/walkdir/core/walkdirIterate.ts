import { NotUndefined } from '@dn/types';
import type { Stats } from 'fs';
import { WalkdirOptions } from '../types/WalkdirOptions';
import { walkdirEmitter } from './walkdirEmitter';
import { WalkdirController } from '../types/WalkdirController';

/**
 * Read filesystem directory contents recursively.
 * Provide an iterator callback. If the callback returns a value, the walk ends and the value is returned.
 * Use controller to pause, resume, and more methods available.
 *
 * @remarks
 * The provided 'dirpath' can be either a relative or absolute path.
 * All path results match this configuration.
 */
export function walkdirIterate<Ret extends NotUndefined>(
  dirpath: string,
  callback: (
    path: string,
    stat: Stats,
    controller: WalkdirController<Ret>,
  ) => (void | Ret) | Promise<void | Ret>,
  options: WalkdirOptions = {},
): Promise<Ret | void> {
  const emitter = walkdirEmitter<Ret>(dirpath, options);

  emitter.on('data', async (fspath, stats) => {
    try {
      const retval = await callback(fspath, stats, emitter);
      if (retval !== undefined) {
        emitter.return(retval);
      }
    } catch (error) {
      emitter.emit('error', error);
    }
  });

  return emitter.awaitReturn();
}
