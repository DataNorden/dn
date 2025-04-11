import { ValueOf } from '../util/ValueOf';
import { EnumTools } from '../lib/EnumTools';
import { FrozenNullObject } from '../lib/NullObject';

/**
 * Valid NODE_ENV value
 */
export const NodeEnv = FrozenNullObject({
  development: 'development',
  production: 'production',
  test: 'test',
  CI: 'CI',
} as const);
export type NodeEnv = ValueOf<typeof NodeEnv>;
export const NodeEnvTools = new EnumTools('NodeEnv', NodeEnv);

export const isNodeEnv = {
  /**
   * Check if the current NODE_ENV is 'development'
   */
  development() {
    return process.env['NODE_ENV'] === NodeEnv.development || !process.env['NODE_ENV'];
  },

  /**
   * Check if the current NODE_ENV is 'production'
   */
  production() {
    return process.env['NODE_ENV'] === NodeEnv.production;
  },

  /**
   * Check if the current NODE_ENV is 'test'
   */
  test() {
    return process.env['NODE_ENV'] === NodeEnv.test;
  },

  /**
   * Check if the current NODE_ENV is 'CI'
   */
  CI() {
    return process.env['NODE_ENV'] === NodeEnv.CI;
  },

  /**
   * Check if the current NODE_ENV is 'test' or 'CI'
   */
  testOrCI() {
    return this.test() || this.CI();
  },
};
