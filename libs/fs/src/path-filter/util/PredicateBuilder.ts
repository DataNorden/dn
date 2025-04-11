import { Arrayable } from '@dn/types';
import { MinimatchOptions } from 'minimatch';
import { createPathPredicate } from './createPathPredicate';
import {
  GenericStringPredicate,
  StringPredicateDefinition,
  StringPredicateBuilderDefinition,
} from '../types';
import { IPredicateStrategy } from '../strategies/IPredicateStrategy';

/**
 *
 */
export class PredicateBuilder<P extends GenericStringPredicate> {
  private definitions: StringPredicateBuilderDefinition<P>[] = [];
  private defaultGlobOptions: MinimatchOptions = {};
  private mode: 'AND' | 'OR' = 'AND';

  constructor(
    private strategy: IPredicateStrategy<P>,
    defaultGlobOptions?: MinimatchOptions,
  ) {
    if (defaultGlobOptions) this.defaultGlobOptions = defaultGlobOptions;
  }

  OR(): this {
    this.mode = 'OR';
    return this;
  }

  compile(): P {
    console.debug({ func: this.compile.name, mode: this.mode, definitions: this.definitions });

    return this.strategy.compile(
      this.definitions
        .map((def) => {
          return createPathPredicate<P>(def);
        })
        .flat(),
      this.mode,
    );
  }

  path(
    filters: Arrayable<StringPredicateDefinition<P>>,
    globOptions?: MinimatchOptions,
  ): this {
    this.definitions.push({
      mode: 'include',
      part: 'path',
      filters: filters,
      globOptions: this.mergeGlobOptions(globOptions),
    });
    return this;
  }

  pathNot(
    filters: Arrayable<StringPredicateDefinition<P>>,
    globOptions?: MinimatchOptions,
  ): this {
    this.definitions.push({
      mode: 'exclude',
      part: 'path',
      filters: filters,
      globOptions: this.mergeGlobOptions(globOptions),
    });
    return this;
  }

  basename(
    filters: Arrayable<StringPredicateDefinition<P>>,
    globOptions?: MinimatchOptions,
  ): this {
    this.definitions.push({
      mode: 'include',
      part: 'basename',
      filters: filters,
      globOptions: this.mergeGlobOptions(globOptions),
    });
    return this;
  }

  basenameNot(
    filters: Arrayable<StringPredicateDefinition<P>>,
    globOptions?: MinimatchOptions,
  ): this {
    this.definitions.push({
      mode: 'exclude',
      part: 'basename',
      filters: filters,
      globOptions: this.mergeGlobOptions(globOptions),
    });
    return this;
  }

  protected mergeGlobOptions(globOptions?: MinimatchOptions) {
    const o = { ...this.defaultGlobOptions, ...globOptions };
    return Object.keys(o).length ? o : undefined;
  }
}
