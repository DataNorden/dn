import { StringKeyOf } from '@dn/types'

/**
 * Same as Object.entries except the keys are typed as keyof T.
 */
export function entriesOf<T extends object>(obj: T) {
  return Object.entries(obj) as [StringKeyOf<T>, T[StringKeyOf<T>]][]
}
