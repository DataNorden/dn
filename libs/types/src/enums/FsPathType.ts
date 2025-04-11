import { EnumTools, FrozenNullObject } from '../lib';
import { ValueOf } from '../util';

export const FsPathType = FrozenNullObject({
  File: 'File',
  Directory: 'Directory',
  BlockDevice: 'BlockDevice',
  CharacterDevice: 'CharacterDevice',
  SymbolicLink: 'SymbolicLink',
  FIFO: 'FIFO',
  Socket: 'Socket',
} as const);

export type FsPathType = ValueOf<typeof FsPathType>;
export const FsPathTypeTools = new EnumTools('FsPathTypes', FsPathType);
