/**
 * Decorator to make a getter accessor property lazy loaded by setting the property value on the object
 *
 * @example ```ts
 * class A {
 *   @lazyProp
 *   static get a() {
 *     return 'a'
 *   }
 *
 *   @lazyProp
 *   get a() {
 *     return 'a'
 *   }
 * }
 * ```
 */
export function lazyProp(target: unknown, key: string, descriptor?: PropertyDescriptor) {
  if (!descriptor) {
    return;
  }

  const origKey = 'get' in descriptor ? 'get' : 'value';

  const orig = descriptor[origKey];

  if (!(typeof orig === 'function' && orig !== Function.prototype)) {
    throw new Error(
      `"get" nor "value" are a function for ${key} with descriptor: ${JSON.stringify(descriptor)}. target: ${JSON.stringify(target)}`,
    );
  }

  descriptor[origKey] = function () {
    const value = orig.call(this);

    Object.defineProperty(this, key, {
      enumerable: true,
      writable: false,
      configurable: false,
      value,
    });
    return value;
  };

  return descriptor;
}
