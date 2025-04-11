import { describe, expect, it } from 'vitest';
import * as mod from './index';

describe('index', () => {
  it('should load module', () => {
    expect(mod).toBeTypeOf('object');
    for (const prop of Object.values(mod)) {
      expect(prop).toBeDefined();
    }
  });
});
