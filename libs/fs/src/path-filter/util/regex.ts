import { escapeRegExp } from 'lodash';

export function equalsRegex(value: string, flags: string) {
  return new RegExp(`^${escapeRegExp(value)}$`, flags);
}
export function includesRegex(value: string, flags: string) {
  return new RegExp(`${escapeRegExp(value)}`, flags);
}
export function startsWithRegex(value: string, flags: string) {
  return new RegExp(`^${escapeRegExp(value)}`, flags);
}
export function endsWithRegex(value: string, flags: string) {
  return new RegExp(`${escapeRegExp(value)}$`, flags);
}
export function equalsRegexNoEscape(value: string, flags: string) {
  return new RegExp(`^${value}$`, flags);
}
export function includesRegexNoEscape(value: string, flags: string) {
  return new RegExp(`${value}`, flags);
}
export function startsWithRegexNoEscape(value: string, flags: string) {
  return new RegExp(`^${value}`, flags);
}
export function endsWithRegexNoEscape(value: string, flags: string) {
  return new RegExp(`${value}$`, flags);
}
