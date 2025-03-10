/**
 * Create an object with null as its prototype.
 * When used as a dictionary, lookups are safer
 * because there are no prototype keys that
 * might return a value.
 */
export function NullObject<T extends NonNullable<unknown>>(o: T): T {
  const onull = Object.create(null) as T;
  for (const key of Object.keys(o).sort()) {
    if (Object.prototype.hasOwnProperty.call(o, key) && o[key as keyof T] !== undefined) {
      onull[key as keyof T] = o[key as keyof T];
    }
  }
  return onull;
}

/**
 * Identical to @see NullObject expect that the returned object is frozen.
 */
export function FrozenNullObject<T extends NonNullable<unknown>>(o: T): T {
  return Object.freeze(NullObject(o));
}
