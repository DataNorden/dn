/**
 * Takes an interface with properties and returns a new interface
 * where prop keys and value types are converted to property getter methods.
 *
 * @remarks
 * Note that the original prop keys are NOT changed.
 *
 * @example
 * Input:   `{ one:       number }`
 * Returns: `{ get one(): number }`
 */
export type InterfacePropsToPropertyGetterMethods<T extends object> = {
  [K in keyof Required<T>]: () => T[K];
};
/**
 * Takes an interface with properties and returns a new interface
 * where prop keys are converted to property setter methods.
 *
 * @remarks
 * Note that the original prop keys are NOT changed.
 *
 * @example
 * Input:   `{ one:       number }`
 * Returns: `{ set one(): void }`
 */
export type InterfacePropsToPropertySetterMethods<T extends object> = Required<{
  [K in keyof Required<T>]: (this: null, value: T[K]) => T;
}>;
/**
 * Takes an interface with properties and returns a new interface
 * where prop keys and value types are converted to chainable setter
 * methods methods from keys and prop value types.
 *
 * @remarks
 * Note that the original prop keys are NOT changed.
 *
 * @example
 * Input:   `{ one:   number,  two?:  string }`
 * Returns: `{ one(): this,    two(): this   }`
 */
export type InterfacePropsToChainableSetterMethods<T extends object, This = null> = {
  [K in keyof Required<T> as K]: null extends This
    ? (value: T[K]) => T
    : (this: This, value: T[K]) => T;
};
/**
 * Takes an interface with properties and returns a new interface
 * where props are converted to getter methods from keys and prop value types.
 *
 * @remarks
 * Note that the original prop keys are all changes so the current method namespace
 * are more unlikely to collide with the new method names.
 *
 * @example
 * Input:   `{ one:      number,  two?:     string             }`
 * Returns: `{ getOne(): number,  getTwo(): string | undefined }`
 */
export type InterfacePropsToSetterMethods<T extends object, This = null> = Required<{
  [K in keyof Required<T> as `set${Capitalize<string & K>}`]: null extends This
    ? (value: T[K]) => T
    : (this: This, value: T[K]) => T;
}>;
/**
 * Takes an interface with properties and returns a new interface
 * where props are converted to getter methods from keys and prop value types.
 *
 * @remarks
 * Note that the original prop keys are all changes so the current method namespace
 * are more unlikely to collide with the new method names.
 *
 * @example
 * Input:   `{ one:      number,  two?:     string             }`
 * Returns: `{ getOne(): number,  getTwo(): string | undefined }`
 */
export type InterfacePropsToGetterMethods<T extends object, This = null> = Required<{
  [K in keyof T as `get${Capitalize<string & K>}`]: null extends This
    ? () => T[K]
    : (this: This) => T[K];
}>;
/**
 * Takes an interface with properties and returns a new interface
 * where prop keys are converted to hasMethods -methods that return a boolean
 * value indicating if the prop is defined.
 *
 * @remarks
 * Note that the original prop keys are all changes so the current method namespace
 * are more unlikely to collide with the new method names.
 *
 * @example
 * Input:   `{ one:   number,  two?:  string }`
 * Returns: `{ one(): this,    two(): this   }`
 */
export type InterfacePropsToHasBooleanMethods<T extends object, This = null> = Required<{
  [K in keyof T as `has${Capitalize<string & K>}`]: null extends This
    ? () => boolean
    : (this: This) => boolean;
}>;
