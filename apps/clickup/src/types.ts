import { ValueOf } from 'type-fest'

export const LIST = {
  General: '901505798664',
  Refactoring: '901505798882',
  Security: '901505799491',
  ProjectManagement: '901505828803',
  TestCoverage: '901506523892',
} as const
export type ListKey = keyof typeof LIST
export type ListValue = ValueOf<typeof LIST>
export const listKeys = Object.keys(LIST) as ListKey[]

export const STATUS = {
  todo: 'to do',
  planned: 'planned',
  progress: 'in progress',
  review: 'review',
  hold: 'on hold',
  waiting: 'waiting',
} as const
export type StatusKey = keyof typeof STATUS
export type StatusValue = ValueOf<typeof STATUS>
export const statusKeys = Object.keys(STATUS) as StatusKey[]

export const PRIORITY = {
  urgent: 1,
  high: 2,
  normal: 3,
  low: 4,
} as const
export type PritorityKey = keyof typeof PRIORITY
export type PritorityValue = ValueOf<typeof PRIORITY>
export const priorityKeys = Object.keys(PRIORITY) as PritorityKey[]
