import type { Stats } from 'fs-extra';
import { MinimatchOptions } from 'minimatch';
import type { AllUnionFields, Arrayable } from 'type-fest';

export type GenericStringPredicate<Args extends AnyArgs = AnyArgs> = (
  s: string,
  ...args: Args
) => boolean;
export type StringPredicate = (s: string) => boolean;
export type PathPredicate = (s: string) => boolean;
export type PathStatPredicate = (s: string, stats: Stats) => boolean;
export type PathNormalizer = (s: string) => string;
export type StringPredicateDefinition<
  Predicate extends GenericStringPredicate = GenericStringPredicate,
> = RegExp | Predicate | GlobPattern | LiteralStringPredicateDefinition;

type GlobPattern = string;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyArgs = any[];

export type LiteralStringPredicateDefinition = AllUnionFields<
  | { includes: string; ignoreCase?: boolean }
  | { equals: string; ignoreCase?: boolean }
  | { startsWith: string; ignoreCase?: boolean }
  | { endsWith: string; ignoreCase?: boolean }
>;

export interface StringPredicateBuilderDefinition<P extends GenericStringPredicate> {
  mode: 'include' | 'exclude';
  part: 'path' | 'basename';
  filters: Arrayable<StringPredicateDefinition<P>>;
  globOptions?: MinimatchOptions;
}
