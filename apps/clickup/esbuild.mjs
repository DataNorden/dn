import * as esbuild from 'esbuild'
import fs from 'fs-extra'

const names = fs
  .readdirSync('src', { withFileTypes: true })
  .filter((d) => d.isFile() && d.name.endsWith('.ts'))
  .map((d) => d.name.replace(/\.ts$/, ''))

for (const name of names) {
  await esbuild.build({
    entryPoints: [`src/${name}.ts`],
    bundle: true,
    outfile: `../../.dist/clickup/${name}.cjs`,
    tsconfig: 'tsconfig.json',
    platform: 'node',
    format: 'cjs',
    target: ['node20'],
    keepNames: true,
    minify: false,
    mainFields: ['module', 'main'],
    sourcemap: true,
  })
}
