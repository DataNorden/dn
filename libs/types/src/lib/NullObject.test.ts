import { describe, it, expect } from 'vitest';
import { NullObject, FrozenNullObject } from './NullObject';

describe(NullObject.name, () => {
  it('should create an object with a null prototype', () => {
    const obj = { a: 1, b: 2 };
    const result = NullObject(obj);

    expect(Object.getPrototypeOf(result)).toBeNull();
    expect(result.a).toBe(1);
    expect(result.b).toBe(2);
  });

  it('should not include undefined properties', () => {
    const obj = { a: 1, b: undefined, c: 3 };
    const result = NullObject(obj);

    expect('b' in result).toBe(false);
    expect(result.a).toBe(1);
    expect(result.c).toBe(3);
  });

  it('should not have prototype keys', () => {
    const obj = {};
    const result = NullObject(obj);
    expect(Object.getPrototypeOf(result)).toBeNull();
  });
});

describe(FrozenNullObject.name, () => {
  it('should create a frozen object with a null prototype', () => {
    const obj = { x: 10, y: 20 };
    const result = FrozenNullObject(obj);

    expect(Object.getPrototypeOf(result)).toBeNull();
    expect(Object.isFrozen(result)).toBe(true);
    expect(result.x).toBe(10);
    expect(result.y).toBe(20);
  });

  it('should not allow adding new properties', () => {
    const obj = { a: 1 };
    const result = FrozenNullObject(obj);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(() => (result.b = 2)).toThrow();
  });

  it('should not include undefined properties and remain frozen', () => {
    const obj = { a: 1, b: undefined };
    const result = FrozenNullObject(obj);

    expect('b' in result).toBe(false);
    expect(result.a).toBe(1);
    expect(Object.isFrozen(result)).toBe(true);
  });
});
