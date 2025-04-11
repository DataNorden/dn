```ts
// ----- USAGE EXAMPLES -----

import { PredicateBuilder } from './util/PredicateBuilder';
import { PathStatPredicateStrategy } from './strategies/PathStatPredicateStrategy';
import { PathPredicateStrategy } from './strategies/PathPredicateStrategy';
import { PathPredicate, PathStatPredicate } from './util/types';

// 1. Regular path predicate:
const pathBuilder = new PredicateBuilder<PathPredicate>(new PathPredicateStrategy());
const compiledPathPredicate = pathBuilder
  .path(/\.js$/)
  .basenameNot({ startsWith: 'temp' })
  .compile();

// 2. Stat predicate:
const statBuilder = new PredicateBuilder<PathStatPredicate>(new PathStatPredicateStrategy(), {
  /* default glob options */
});
const compiledStatPredicate = statBuilder.path('src/**/*.ts').compile();

// 3. FsPathStat predicate with type filtering:
const fsStatBuilder = new PredicateBuilder<PathStatPredicate>(
  new PathStatPredicateStrategy(['File', 'Directory']), // Replace with actual FsPathType values
  {
    /* default glob options */
  },
);
const compiledFsStatPredicate = fsStatBuilder.pathNot(/\.spec\.ts$/).compile();
```
