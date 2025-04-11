import { Arrayable, FsPathType } from '@dn/types';
import type { Stats } from 'fs';

export function createPathTypePredicate(pathType?: Arrayable<FsPathType>) {
  const types = [pathType ?? []].flat(2);
  if (!types.length) {
    return () => true;
  }
  const predicates = types.map((type) => {
    const key = `is${type}` as `is${FsPathType}`;
    return (stats: Stats) => stats[key]();
  });
  return (stats: Stats) => {
    return predicates.some((predicate) => predicate(stats));
  };
}
