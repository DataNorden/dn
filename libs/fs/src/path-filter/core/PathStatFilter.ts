import { FsPathType } from '@dn/types';
import { MinimatchOptions } from 'minimatch';
import { PathStatPredicateStrategy } from '../strategies/PathStatPredicateStrategy';
import { PredicateBuilder } from '../util/PredicateBuilder';
import { PathStatPredicate } from '../types';

export function PathStatFilter(
  callback: createPathStatFilterCallback,
  defaultGlobOptions?: MinimatchOptions,
): PathStatPredicate;
export function PathStatFilter<T extends FsPathType = FsPathType>(
  types: T[],
  callback: createPathStatFilterCallback,
  defaultGlobOptions?: MinimatchOptions,
): PathStatPredicate;
export function PathStatFilter<T extends FsPathType = FsPathType>(
  arg0: T[] | createPathStatFilterCallback,
  arg1?: createPathStatFilterCallback | MinimatchOptions,
  arg2?: MinimatchOptions,
): PathStatPredicate {
  let types: T[] = [];
  let callback: createPathStatFilterCallback;
  let defaultGlobOptions: MinimatchOptions | undefined;

  // Determine if the first argument is the types array or the callback.
  if (Array.isArray(arg0)) {
    types = arg0;
    callback = arg1 as createPathStatFilterCallback;
    defaultGlobOptions = arg2;
  } else {
    callback = arg0;
    defaultGlobOptions = arg1 as MinimatchOptions | undefined;
  }

  const builder = new PredicateBuilder<PathStatPredicate>(
    new PathStatPredicateStrategy<T>(types),
    defaultGlobOptions,
  );
  callback(builder);
  return builder.compile();
}
type createPathStatFilterCallback = (
  ins: Omit<PredicateBuilder<PathStatPredicate>, 'compile'>,
) => void | unknown;
