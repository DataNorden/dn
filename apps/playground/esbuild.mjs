import * as esbuild from 'esbuild';

const playgroundName = process.argv[2];

if (playgroundName && !playgroundName.startsWith('-')) {
  await buildPlayground(playgroundName);
} else {
  await buildMain();
}

/**
 * Build main
 */
async function buildMain() {
  await esbuild.build({
    entryPoints: [`src/main.ts`],
    bundle: true,
    outfile: '../../.dist/playground/main.cjs',
    tsconfig: 'tsconfig.json',
    platform: 'node',
    format: 'cjs',
    target: ['node20'],
    keepNames: true,
    minify: false,
    mainFields: ['module', 'main'],
    sourcemap: true,
    external: ['cpu-features'],
  });
}

/**
 * Build a single playground
 */
async function buildPlayground(playgroundName) {
  console.log('building playground: ' + playgroundName);
  await esbuild.build({
    entryPoints: [`src/playgrounds/${playgroundName}/main.ts`],
    bundle: true,
    outfile: `../../.dist/playground/${playgroundName}.cjs`,
    tsconfig: 'tsconfig.json',
    platform: 'node',
    format: 'cjs',
    target: ['node20'],
    keepNames: true,
    minify: false,
    mainFields: ['module', 'main'],
    sourcemap: true,
    external: ['cpu-features'],
  });
  console.log('build done');
}
