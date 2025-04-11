import { MinimatchOptions } from 'minimatch';
import { PathPredicateStrategy } from '../strategies/PathPredicateStrategy';
import { PredicateBuilder } from '../util/PredicateBuilder';
import { PathPredicate } from '../types';

/**
 *
 */
export function PathFilter(
  callback: (ins: Omit<PredicateBuilder<PathPredicate>, 'compile'>) => void | unknown,
  defaultGlobOptions?: MinimatchOptions,
): PathPredicate {
  const builder = new PredicateBuilder<PathPredicate>(
    new PathPredicateStrategy(),
    defaultGlobOptions,
  );
  callback(builder);
  return builder.compile();
}
