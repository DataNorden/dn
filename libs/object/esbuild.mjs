import fs from 'fs-extra';
import * as ts from 'typescript';
import strip from 'strip-comments';

const outDir = '.dist';

const pkg = fs.readJsonSync('./package.json');

const tsconfigBaseFilepath = '../../tsconfig.base.json';
const tsconfigBaseJson = strip(fs.readFileSync(tsconfigBaseFilepath, 'utf8'));
const tsconfigBase = JSON.parse(tsconfigBaseJson);

fs.removeSync(outDir);

ts.createProgram({
  rootNames: ['./src/index.ts'],
  options: {
    ...tsconfigBase,
    emitDeclarationOnly: false,
    allowJs: true,
    declaration: true,
    declarationMap: true,
    sourceMap: true,
    emitDecoratorMetadata: true,
    downlevelIteration: true,
    outDir: outDir,
  },
}).emit();

fs.writeJsonSync(
  outDir + '/package.json',
  {
    name: pkg.name.replace('@dn', '@datanorden'),
    version: pkg.version,
    private: true,
    type: 'module',
    module: 'index.js',
    main: 'index.js',
    typings: 'index.d.ts',
    dependencies: pkg.dependencies ?? {},
  },
  { spaces: 2 },
);
