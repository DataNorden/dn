import fs from 'fs-extra'
import child_processp from 'child_process'
import util from 'util'
import { getTempDataPath } from '@dn/fs/path'

export async function getEditorInput(opts: { debug?: boolean; openEditor: string }) {
  const filepath = getTempDataPath('dn', 'clickup', 'editor_input.md')
  if (opts.debug) console.debug('Filepath:', filepath)
  await fs.ensureFile(filepath)

  try {
    const exec = util.promisify(child_processp.exec)
    await exec(opts.openEditor + ' ' + filepath)
  } catch (error) {
    console.error(error)
    console.error('Could not open editor with command: ', opts.openEditor)
    return
  }

  const content = (await fs.readFile(filepath, 'utf8')).trim()
  if (!content) {
    console.error('File is empty')
    return
  }

  const lines = content.trim().split(/\r?\n/g)
  return lines
}
