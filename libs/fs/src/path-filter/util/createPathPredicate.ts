import type { Stats } from 'fs';
import { MinimatchOptions, minimatch } from 'minimatch';
import path from 'upath';
import {
  GenericStringPredicate,
  StringPredicateBuilderDefinition,
  StringPredicateDefinition,
} from '../types';
import { equalsRegex, includesRegex, startsWithRegex, endsWithRegex } from './regex';

/**
 *
 */
export function createPathPredicate<P extends GenericStringPredicate>(
  options: StringPredicateBuilderDefinition<P>,
): P[] {
  const { mode, part, filters, globOptions } = options;
  const maybeNegate = mode === 'exclude' ? (v: boolean) => !v : (v: boolean) => v;
  const transformPath = part === 'basename' ? path.basename : (v: string) => v;
  return ([filters].flat() as StringPredicateDefinition<P>[]).map((filter) => {
    const predicate = parsePredicateDefinition(filter, globOptions);
    return ((fspath: string, stats: Stats) => {
      const transformed = transformPath(fspath);
      const bool = predicate(transformed, stats);
      return maybeNegate(bool);
    }) as P;
  });
}

export function parsePredicateDefinition<P extends GenericStringPredicate>(
  definition: StringPredicateDefinition<P>,
  globOptions?: MinimatchOptions,
): GenericStringPredicate {
  if (typeof definition === 'function') {
    return (fspath: string, stats: Stats) => definition(fspath, stats);
  } else if (typeof definition === 'string') {
    return (fspath: string) => minimatch(fspath, definition, globOptions);
  } else if (definition instanceof RegExp) {
    return (fspath: string) => definition.test(fspath);
  } else if (definition && typeof definition === 'object') {
    const key = keysOf(definition).find((k) => k !== 'ignoreCase')!;
    if (!key) {
      throw new TypeError('Invalid filter definition: ' + JSON.stringify(definition));
    }
    const value = definition[key] as string;
    const flags = isIgnoreCase(definition.ignoreCase, value) ? 'i' : '';
    let regex: RegExp;
    if (key === 'equals') {
      regex = equalsRegex(value, flags);
    } else if (key === 'includes') {
      regex = includesRegex(value, flags);
    } else if (key === 'startsWith') {
      regex = startsWithRegex(value, flags);
    } else if (key === 'endsWith') {
      regex = endsWithRegex(value, flags);
    } else {
      throw new TypeError('Invalid filter');
    }
    return (fspath: string) => regex.test(fspath);
  } else {
    throw new TypeError('Invalid filter');
  }
}

/**
 *If ignoreCase is defined, returns it. Otherwise, default to true if the string has no uppercase characters.
 */
function isIgnoreCase(ignoreCase?: boolean, orDetermineFrom: string = '') {
  return ignoreCase !== undefined ? ignoreCase : !hasUpperCase(orDetermineFrom);
}

function hasUpperCase(str: string) {
  return str.toLowerCase() !== str;
}

/**
 * Same as Object.keys except the keys are typed as keyof T.
 */
export function keysOf<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}
