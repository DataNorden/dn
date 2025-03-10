// vitest.config.ts
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import { getRepoRootDirpath } from './s/util/getRepoRootDirpath.mjs';
import { getAllWorkspaceTsconfigFilepaths } from './s/util/getAllWorkspaceTsconfigFilepaths.mjs';

const defaults = {
  globals: false, // WARNING: globals=true causes problems
  isolate: true,
  hookTimeout: 60_000,
  testTimeout: 15_000,
  passWithNoTests: true,

  coverage: {
    enabled: false,
    provider: 'istanbul',
    reporter: ['json-summary', 'html'],
    include: ['{apps,libs}/*/src/**/*.ts'],
    reportsDirectory: `coverage/dn`,
  },
};

export const test = {
  ...defaults, //
  include: [`{apps,libs}/*/src/**/*.{spec,test}.ts`],
};

export const plugins = [
  tsconfigPaths({
    configNames: ['tsconfig.json'],
    projects: getAllWorkspaceTsconfigFilepaths(),
    root: getRepoRootDirpath(),
  }),
];

export default defineConfig({
  test,
  plugins,
});
