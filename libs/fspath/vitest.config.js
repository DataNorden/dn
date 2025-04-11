// vitest.config.ts
import { defineConfig } from 'vitest/config';
import { test, plugins } from '../../vitest.config';
import path from 'path';

const ws = path.basename(__dirname);

export default defineConfig({
  test: {
    ...test,
    name: '@rfmain/' + ws, //
    coverage: {
      ...test.coverage,
      include: [`libs/${ws}/src/**/*.ts`],
      reportsDirectory: `coverage/${ws}`,
    },
    include: [`libs/${ws}/src/**/*.{spec,test}.ts`],
  },
  plugins,
});
