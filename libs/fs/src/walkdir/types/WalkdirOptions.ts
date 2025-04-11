import { Arrayable, FsPathType } from '@dn/types';
import {
  StringPredicateDefinition,
  PathPredicate,
  PathStatPredicate,
  PathNormalizer,
} from '../../path-filter/types';

export interface WalkdirOptions {
  /**
   * Skip traversing the sub-paths of matching directories' paths.
   *
   * @remarks
   * When a dirpath matches any of the provided filters, all its sub-paths are skipped, but not the dirpath itself.
   * Intended for traversal time reduction.
   */
  skipDirpaths?: Arrayable<StringPredicateDefinition<PathPredicate>>;
  /**
   * Skip traversing the sub-paths of matching directories' paths.
   *
   * @remarks
   * When a dirname matches any of the provided filters, all its sub-paths are skipped, but not the dirname itself.
   * Intended for traversal time reduction.
   */
  skipDirnames?: Arrayable<StringPredicateDefinition<PathPredicate>>;
  /**
   * Filter output paths.
   * Unlike 'skip', traversal is not affected when excluding dirpaths because sub-paths are evaluated individually.
   */
  filterPaths?: Arrayable<StringPredicateDefinition<PathStatPredicate | PathPredicate>>;
  /**
   * Filter output names.
   * Unlike 'skip', traversal is not affected when excluding dirnames because sub-paths are evaluated individually.
   */
  filterNames?: Arrayable<StringPredicateDefinition<PathStatPredicate | PathPredicate>>;
  /**
   * File types to include.
   */
  types?: Arrayable<FsPathType>;
  /**
   * Normalize paths. Applied before filters.
   * Defaults to 'absolute' if input dirpath is absolute, otherwise 'relative'
   */
  normalize?: 'relative' | 'absolute' | PathNormalizer;
  /**
   * whether to follow symlinks
   */
  followSymlinks?: boolean;
  /**
   * on filesystems where inodes are not unique like windows (or perhaps hardlinks) some files may not be emitted due to inode collision.
   * turning off this behavior may be required but at the same time may lead to hitting max_depth via link loop.
   */
  noInodeTracking?: boolean;
  /**
   * only travel to max depth. emits an error if hit.
   */
  maxDepth?: number;
}
