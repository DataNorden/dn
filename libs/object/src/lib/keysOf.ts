import { StringKeyOf } from '@dn/types'

/**
 * Same as Object.keys except the keys are typed as keyof T.
 */
export function keysOf<T extends object>(obj: T) {
  return Object.keys(obj) as StringKeyOf<T>[]
}
