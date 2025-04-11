import { PathPredicate } from '../types';
import { IPredicateStrategy } from './IPredicateStrategy';

/**
 * Concrete strategy for simple path predicates
 */

export class PathPredicateStrategy implements IPredicateStrategy<PathPredicate> {
  compile(predicates: PathPredicate[], mode: 'AND' | 'OR'): PathPredicate {
    if (predicates.length === 0) return () => true;
    if (predicates.length === 1) return predicates[0];
    return mode === 'AND'
      ? (fspath: string) => predicates.every((p) => p(fspath))
      : (fspath: string) => predicates.some((p) => p(fspath));
  }
}
