export interface GenericLogger {
  debug(...args: unknown[]): unknown;
  info(...args: unknown[]): unknown;
  warn(...args: unknown[]): unknown;
  error(...args: unknown[]): unknown;
}

export function consoleLogger() {
  return {
    debug: console.debug,
    info: console.info,
    error: console.error,
    warn: console.warn,
  };
}

export function noopLogger() {
  return {
    debug: () => {},
    info: () => {}, //
    warn: () => {},
    error: () => {},
  };
}
