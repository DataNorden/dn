import { StringPredicateDefinition, StringPredicate } from '@dn/fs/path-filter';
import { Arrayable } from '@dn/types';
import { WalkdirOptions } from './WalkdirOptions';

export type WalkdirSearchOptions = Omit<WalkdirOptions, 'types'> & {
  /**
   * Filter file content.
   */
  content?: Arrayable<StringPredicateDefinition<StringPredicate>>;
  /**
   * Max size (kB) of files to search contents of.
   */
  maxSize?: number;
  /**
   * Set a maximum number of search results
   */
  maxResults?: number;
};
