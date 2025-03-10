import * as esbuild from 'esbuild';
import fs from 'fs-extra';

const pkg = fs.readJsonSync('./package.json');

await esbuild.build({
  entryPoints: Object.values(pkg.exports),
  bundle: true,
  outdir: '.dist',
  tsconfig: 'tsconfig.json',
  platform: 'node',
  format: 'cjs',
  target: ['node20'],
  keepNames: true,
  minify: false,
  sourcemap: true,
});
