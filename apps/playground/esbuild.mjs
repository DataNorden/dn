import * as esbuild from 'esbuild';

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
});
