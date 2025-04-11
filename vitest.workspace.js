import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  './vitest.config.js',
  './libs/types/vitest.config.js',
  './libs/fspath/vitest.config.js',
  './libs/object/vitest.config.js',
  './libs/fs/vitest.config.js',
  './libs/cli/vitest.config.js',
  './apps/playground/vitest.config.js',
  './apps/devkit/vitest.config.js',
  './apps/clickup/vitest.config.js',
])
