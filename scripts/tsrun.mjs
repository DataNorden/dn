import cp from 'child_process'
import * as esbuild from 'esbuild'
import fs from 'fs-extra'
import path from 'path'

const arg0 = process.argv[2]
const relative = path.isAbsolute(arg0) ? path.relative(process.cwd(), arg0) : arg0
const wsPath = relative.split(/\\|\//).slice(0, 2).join('/')
const wsTsconfigPath = path.join(wsPath, 'tsconfig.json')
const wsPkg = fs.readJsonSync(path.join(wsPath, 'package.json'))
const wsName = wsPkg.name.split(/\\|\//).pop()
const cjsBasename = path.basename(relative).replace('.ts', '.cjs')
const outfile = `.dist/temp/runner.cjs`
const importSourceMapLine = `import 'source-map-support/register'`
const tscode = fs.readFileSync(relative, 'utf8')

if (process.argv.slice(2).includes('--debug')) {
  console.log({
    arg0,
    relative,
    wsPath,
    wsTsconfigPath,
    wsName,
    cjsBasename,
    outfile,
    importSourceMapLine,
    tscode,
  })
}

let changedSourceFile = false

try {
  if (!tscode.includes(importSourceMapLine)) {
    changedSourceFile = true
    fs.writeFileSync(relative, importSourceMapLine + '\n' + tscode)
  }

  await esbuild.build({
    entryPoints: [relative],
    bundle: true,
    outfile: outfile,
    tsconfig: wsTsconfigPath,
    platform: 'node',
    format: 'cjs',
    target: ['node20'],
    keepNames: true,
    minify: true,
    mainFields: ['module', 'main'],
    sourcemap: true,
  })
} finally {
  if (changedSourceFile) {
    fs.writeFileSync(relative, tscode)
  }
}

cp.spawn('node', [outfile, ...process.argv.slice(3)], {
  stdio: 'inherit',
  cwd: process.cwd(),
})
