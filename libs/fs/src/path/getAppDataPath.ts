import fs from 'fs';
import os from 'os';
import path from 'upath';

/**
 * Get the app data path, depending on the current OS (win, osx, linux).
 */
export function getAppDataPath(...paths: string[]) {
  let result = process.env['APPDATA'];
  if (!result) {
    const OS = getOS();
    if (OS === 'windows') {
      result = path.join(os.homedir(), 'AppData', 'Roaming');
    } else if (OS === 'osx') {
      result = path.join(os.homedir(), 'Library', 'Application Support');
    } else if (OS === 'linux') {
      result = path.join(os.homedir(), '.config');
    } else {
      throw new Error('Could not find an appropriate app data path');
    }
  }
  result = fs.realpathSync(result);
  if (!paths.length) return result;
  if (paths[0] === os.homedir()) paths[0] = '.' + paths[0];
  return path.join(result, ...paths);
}

/**
 * Determines the current operating system.
 * It uses the isWindows, isOSX, and isLinux functions to determine the current operating system.
 * @returns A string indicating the current operating system. It can be 'windows', 'osx', 'linux', or 'unknown'.
 */
export function getOS(): 'windows' | 'osx' | 'linux' | 'unknown' {
  if (isLinux()) return 'linux';
  if (isOSX()) return 'osx';
  if (isWindows()) return 'windows';
  return 'unknown';
}

/**
 * Checks if the current platform is Linux.
 * It checks the 'process' object and the 'platform' property to determine if the platform is 'linux'.
 * @returns A boolean indicating whether the current platform is Linux.
 */
export function isLinux(): boolean {
  return process.platform === 'linux';
}

/**
 * Checks if the current platform is OSX.
 * It checks the 'process' object and the 'platform' property to determine if the platform is 'darwin'.
 * @returns A boolean indicating whether the current platform is OSX.
 */
export function isOSX(): boolean {
  return process.platform === 'darwin';
}

/**
 * Checks if the current platform is Windows.
 * @remarks
 * It checks the 'process' object and the 'platform' property to determine if the platform is 'win32'.
 * It also checks the 'OSTYPE' environment variable to see if it matches 'msys' or 'cygwin'.
 * @returns A boolean indicating whether the current platform is Windows.
 */
export function isWindows(): boolean {
  return (
    process &&
    (process.platform === 'win32' || /^(msys|cygwin)$/.test(process.env['OSTYPE'] || ''))
  );
}
