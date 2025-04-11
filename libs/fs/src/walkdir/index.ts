import { walkdirEmitter } from './core/walkdirEmitter';
import { walkdirPathsSync } from './core/walkdirPathsSync';
import { walkdirEntriesSync } from './core/walkdirEntriesSync';
import { walkdirEntries } from './core/walkdirEntries';
import { walkdirPaths } from './core/walkdirPaths';
import { walkdirIterate } from './core/walkdirIterate';
import { walkdirSearch } from './core/walkdirSearch';

/**
 * Module that wraps the 'walkdir' npm package, and exports some
 * convenient methods for recursive traversing the filesystem.
 */
export const walkdir = {
  emitter: walkdirEmitter,
  iterate: walkdirIterate,
  search: walkdirSearch,
  paths: walkdirPaths,
  pathsSync: walkdirPathsSync,
  entries: walkdirEntries,
  entriesSync: walkdirEntriesSync,
};

export default walkdir;
