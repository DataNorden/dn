import { NotUndefined } from '@dn/types';
import type { Stats } from 'fs';
import { WalkdirController } from './WalkdirController';

export interface WalkdirEventMap<Ret extends NotUndefined> {
  /**
   * emitted if there is an error from the file system reading the initial or target directory
   */
  error: [Error | unknown];
  /**
   *  emitted when there is an error from the filesystem reading as nested path.
   */
  warn: [string, Error | unknown, WalkdirController<Ret>];
  /**
   * found a path. this is the expected use case. every path for everything inside target directory is emitted here.
   */
  data: [string, Stats, WalkdirController<Ret>];
  /**
   * emitted when walk is cancelled or complete.
   */
  return: [Ret];
}
