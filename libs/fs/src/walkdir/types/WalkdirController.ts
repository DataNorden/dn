import { NotUndefined } from '@dn/types';

export interface WalkdirController<Ret extends NotUndefined> {
  /**
   * cancel a walk in progress and return a given value
   */
  return(value?: Ret): void;
  /**
   * pause the walk
   */
  pause(): void;
  /**
   * resume the walk
   */
  resume(): void;
}
