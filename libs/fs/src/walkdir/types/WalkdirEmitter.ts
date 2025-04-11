import { NotUndefined } from '@dn/types';
import EventEmitter from 'events';
import { WalkdirController } from './WalkdirController';
import { WalkdirEventMap } from './WalkdirEventMap';

export interface WalkdirEmitter<Ret extends NotUndefined>
  extends WalkdirController<Ret>,
    EventEmitter<WalkdirEventMap<Ret>> {
  /**
   * Returns a promise that
   * - resolves when 'return' event is emitted, ie. walk is complete or cancelled
   * - rejects on error
   */
  awaitReturn(): Promise<void | Ret>;
}
