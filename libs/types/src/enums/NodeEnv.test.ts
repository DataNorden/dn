import { describe, expect, it } from 'vitest';
import { isNodeEnv } from './NodeEnv';

describe(isNodeEnv.production.name, () => {
  it('should return boolean', () => {
    expect(isNodeEnv.production()).toBeTypeOf('boolean');
  });
});

describe(isNodeEnv.development.name, () => {
  it('should return boolean', () => {
    expect(isNodeEnv.development()).toBeTypeOf('boolean');
  });
});

describe(isNodeEnv.test.name, () => {
  it('should return boolean', () => {
    expect(isNodeEnv.test()).toBeTypeOf('boolean');
  });
});

describe(isNodeEnv.CI.name, () => {
  it('should return boolean', () => {
    expect(isNodeEnv.CI()).toBeTypeOf('boolean');
  });
});
