// vitest.config.ts
import { defineConfig } from 'vitest/config';
import { test, plugins } from '../../vitest.config';
import path from 'path';

const ws = path.basename(__dirname);

export default defineConfig({
  test: {
    ...test,
    name: ws,
    coverage: {
      ...test.coverage,
      include: [`apps/${ws}/src/**/*.ts`],
      reportsDirectory: `coverage/${ws}`,
    },
    include: [`apps/${ws}/src/**/*.{spec,test}.ts`],
  },
  plugins,
});
