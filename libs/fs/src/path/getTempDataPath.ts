import fs from 'fs-extra';
import os from 'os';
import path from 'upath';

/**
 * Returns a path to the os tmpdir location.
 */
export function getTempDataPath(...paths: string[]): string {
  const result = fs.realpathSync(os.tmpdir());
  if (!result) throw new Error('Temp data directory not found');
  return path.join(fs.realpathSync(result), ...paths);
}
