/**
 *
 */
export class EnumTools<K extends string = string, V extends string = string> {
  readonly keyNotEqualValues?: boolean;
  readonly valuesNotUnique?: boolean;
  readonly subsets?: EnumTools<string, string>[];

  constructor(
    readonly name: string,
    readonly obj: Record<K, V>,
    options?: EnumToolsOptions,
  ) {
    if (options?.keyNotEqualValues) this.keyNotEqualValues = options.keyNotEqualValues;
    if (options?.valuesNotUnique) this.valuesNotUnique = options.valuesNotUnique;
    if (options?.subsets) this.subsets = options.subsets;
  }

  get keys() {
    return Object.keys(this.obj) as K[];
  }

  get values() {
    return Object.values(this.obj) as V[];
  }

  get entries() {
    return Object.entries(this.obj) as [K, V][];
  }

  /**
   * Returns whether 'key' exists on this.obj
   */
  isKey(key: unknown): key is K {
    if (typeof key !== 'string') return false;
    return this.keys.includes(key as K);
  }

  /**
   * Returns whether 'value' is a value on this.obj
   */
  isValid(value: unknown): value is V {
    if (typeof value !== 'string') return false;
    return this.values.includes(value as V);
  }

  /**
   * Same as @see this.values, but excluding subsets' values.
   */
  get ownValues() {
    if (!this.subsets) return this.values;
    const own = new Set(this.values);
    for (const ss of this.subsets) {
      for (const v of ss.values) {
        own.delete(v as V);
      }
    }
    return Array.from(own);
  }
}

/**
 *
 */
export interface EnumToolsOptions {
  readonly keyNotEqualValues?: boolean;
  readonly valuesNotUnique?: boolean;
  readonly subsets?: EnumTools<string, string>[];
}
