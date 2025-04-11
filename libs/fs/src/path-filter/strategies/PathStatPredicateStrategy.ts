import { FsPathType } from '@dn/types';
import type { Stats } from 'fs';
import { PathStatPredicate } from '../types';
import { IPredicateStrategy } from './IPredicateStrategy';
import { createPathTypePredicate } from '../util/createPathTypePredicate';

/**
 * Concrete strategy for stat predicates that only evaluates if the path is of a certain type.
 */
export class PathStatPredicateStrategy<T extends FsPathType>
  implements IPredicateStrategy<PathStatPredicate>
{
  constructor(private types?: Array<T>) {}
  compile(predicates: PathStatPredicate[], mode: 'AND' | 'OR'): PathStatPredicate {
    const filter =
      predicates.length === 0
        ? () => true
        : predicates.length === 1
          ? predicates[0]
          : mode === 'AND'
            ? (fspath: string, stats: Stats) => predicates.every((p) => p(fspath, stats))
            : (fspath: string, stats: Stats) => predicates.some((p) => p(fspath, stats));

    // If types are provided, use the type filter; otherwise return base
    const isCorrectType = this.types?.length //
      ? createPathTypePredicate(this.types)
      : undefined;

    if (!isCorrectType) return filter;

    return (fspath: string, stats: Stats) => !isCorrectType(stats) || filter(fspath, stats);
  }
}
