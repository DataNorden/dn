import dotenv from 'dotenv'
import { Argument, Command, Option } from '@commander-js/extra-typings'
import capi, { AxiosError } from 'axios'
import { getEditorInput } from './getEditorInput'
import { priorityKeys, statusKeys, listKeys, LIST, STATUS, PRIORITY } from './types'

/**
 * Root command
 */
const clickup = new Command('clickup')
  .version('0.0.1')
  .description('Clickup CLI Utils')
  .configureHelp({
    helpWidth: process.stdout.columns ?? 80,
    showGlobalOptions: true, //
    sortOptions: false,
    sortSubcommands: false,
  })
  .addOption(
    new Option('-T, --apiToken <key>', 'Clickup API key') //
      .makeOptionMandatory()
      .env('CLICKUP_API_TOKEN'),
  )
  .addOption(
    new Option('-E, --openEditor <command>', 'Editor launch shell command')
      .makeOptionMandatory()
      .env('OPEN_EDITOR_COMMAND')
      .default('code -w'),
  )
  .addOption(
    new Option('-L, --list <name>', 'List to add task to.')
      .makeOptionMandatory()
      .choices(listKeys)
      .default('General'),
  )
  .addOption(
    new Option('-N, --dotEnv <filepath>', '.env filepath.') //
      .default('./.env'),
  )
  .addOption(
    new Option('-D, --debug', 'Output debug information'), //
  )
  .addOption(
    new Option('-R, --dryRun', 'Do not actually call API. Implies --debug is true.') //
      .implies({ debug: true }),
  )
  .hook('preSubcommand', function loadDotEnv(rootCmd) {
    const opts = rootCmd.opts()
    const parsed = dotenv.config({ path: opts.dotEnv }).parsed
    if (opts.debug) console.debug({ path: opts.dotEnv, parsed })
    if (!parsed) return
    for (const [dotEnvKey, dotEnvValue] of Object.entries(parsed)) {
      const opt = rootCmd.options.find((o) => o.envVar === dotEnvKey)
      if (opt) {
        rootCmd.setOptionValueWithSource(opt.attributeName(), dotEnvValue, 'dotEnv')
      }
    }
  })
  .hook('preAction', function initHttpHeaders(_, actionCmd) {
    const opts = actionCmd.optsWithGlobals()
    if (opts.debug) console.debug('opts', opts)
    capi.defaults.baseURL = 'https://api.clickup.com/api/v2/'
    capi.defaults.headers.common.Authorization = opts.apiToken as string
    capi.defaults.headers.common.Accept = 'application/json'
    capi.defaults.headers.common['Content-Type'] = 'application/json'
    if (opts.debug) console.debug('baseURL', capi.defaults.baseURL)
    if (opts.debug) console.debug('headers', capi.defaults.headers.common)
  })

/**
 * Add task command
 */
clickup
  .command('add')
  .alias('a')
  .description('Create a new task.')
  .addArgument(
    new Argument(
      '[name]',
      'Task title. Omit for ´name´ & ´description´ in editor. line1 parsed as ´name´',
    ),
  )
  .addOption(
    new Option('-d, --description [words...]', 'Task description.') //
      .default([] as string[]),
  )
  .addOption(
    new Option('-t, --time <float>', 'Time Estimate (hours)') //
      .argParser((v) => parseFloat(v) * 60 * 60 * 1000),
  )
  .addOption(
    new Option('-p, --priority <priority>', 'Task Priority') //
      .makeOptionMandatory()
      .choices(priorityKeys)
      .default('normal'),
  )
  .addOption(
    new Option('-s, --status <name>', 'Task Status') //
      .makeOptionMandatory()
      .choices(statusKeys)
      .default('todo'),
  )
  .action(
    /**
     * API Docs: https://developer.clickup.com/reference/createtask
     */
    async function addTaskAction(name, _, cmd) {
      const opts = cmd.optsWithGlobals()

      // editor
      if (!cmd.processedArgs.flat(2).join('').trim()) {
        const lines = await getEditorInput(opts)
        if (!lines) return
        name = name || lines.shift()!
        const _ = (opts.description as string[]).push(lines.join('\n').trim())
      }

      // payload
      const data = {} as any
      if (name) data.name = name
      data.description = (opts.description as string[]).join(' ')
      data.status = STATUS[opts.status]
      data.priority = PRIORITY[opts.priority]
      if (opts.time) data.time_estimate = opts.time

      // api rquest
      try {
        const URI = 'list/' + LIST[opts.list] + '/task'
        if (opts.debug) console.debug('URI', URI)
        if (opts.debug) console.debug('axios payload', data)
        if (opts.dryRun) return
        const response = await capi.post(URI, data)
        if (opts.debug) console.debug(response.data)
        if (opts.debug) console.log('status', response.status + ':', response.statusText)
        console.log('Task created. Id:', response.data.id)
      } catch (error) {
        process.exitCode = 1
        console.error(error)
        if (error instanceof AxiosError) {
          console.error(error.response?.status, error.response?.data || error)
        }
      }
    },
  )

void clickup.parseAsync()
