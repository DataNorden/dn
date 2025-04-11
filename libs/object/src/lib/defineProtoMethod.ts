/**
 * Define a method on the prototype of a class.
 * The given function's first argument must be a class instance, which gets converted to a 'this' argument.
 */
export function defineProtoAccessor<T extends typeof Object.prototype>(
  Class: new (...args: any[]) => T,
  name: string,
  fn: (instance: T, ...args: any[]) => unknown,
) {
  Object.defineProperty(Class.prototype, name, {
    value: toMethod(fn),
    enumerable: false,
    writable: true,
    configurable: true,
  })
}

/**
 * Define a method on the prototype of a class.
 * The given function's first argument must be a class instance, which gets converted to a 'this' argument.
 */
export function defineProtoMethod<T extends typeof Object.prototype>(
  Class: new (...args: any[]) => T,
  name: string,
  fn: (instance: T, ...args: any[]) => unknown,
) {
  Object.defineProperty(Class.prototype, name, {
    value: toMethod(fn),
    enumerable: false,
    writable: true,
    configurable: true,
  })
}

/**
 * Converts a function to a class method by making the 'this' context the first argument.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toMethod<T, Args extends any[], Ret>(
  fn: (target: T, ...args: Args) => Ret,
): (this: T, ...args: Args) => Ret {
  const result = function (this: T, ...args: Args): Ret {
    return fn(this, ...args)
  }
  setLength(fn.length - 1, result)
  setName(fn.name, result)
  return result
}

/**
 * This function sets the name of a function and returns the function with the new name.
 */
export function setName<T extends typeof Function.prototype>(
  name: string | typeof Function.prototype,
  fun: T,
): T {
  Object.defineProperty(fun, 'name', {
    value: typeof name === 'function' ? name.name : name,
    configurable: true,
    writable: true,
    enumerable: false,
  })
  return fun
}

/**
 * Set the length of a function.
 */
export function setLength<T extends object>(
  length: number | { length: number },
  target: T,
): T {
  return Object.defineProperty(target, 'length', {
    enumerable: false,
    value: typeof length === 'number' ? length : length.length,
  })
}
