import path from 'upath';
import { PathNormalizer } from '../../path-filter/types';
import { toRelativePath } from '@dn/fspath/toRelativePath';

/**
 * If 'relative' or 'absolute' is provided, it returns a corresponding predefined path normalizer.
 */

export function createNormalizer(normalize: 'relative' | 'absolute'): PathNormalizer;
/**
 * If a fspath is provided and it is an absolute path, returns the predefined 'absolute' normalized.
If a fspath is provided and it is a relative path, returns the predefined 'relative' normalized.
 */
export function createNormalizer(fromPath: string): PathNormalizer;
export function createNormalizer(arg0: 'relative' | 'absolute' | string) {
  return arg0 === 'absolute'
    ? (v: string) => v
    : arg0 === 'relative'
      ? toRelativePath
      : path.isAbsolute(arg0)
        ? (v: string) => v
        : toRelativePath;
}
