import { GenericStringPredicate } from '../types';

/**
 * Strategy interface that encapsulates predicate compilation
 */
export interface IPredicateStrategy<P extends GenericStringPredicate> {
  compile(predicates: P[], mode: 'AND' | 'OR'): P;
}
