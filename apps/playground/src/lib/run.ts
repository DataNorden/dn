import 'source-map-support/register';
import { exitProcess, initConfig, SourceSchema } from '@rfmain/config';
import { CONFIG, PlaygroundConfig } from './CONFIG';

export async function run(rfmdc: any, main: (config: PlaygroundConfig) => Promise<void>) {
  await initConfig(CONFIG, { rfmdc });
  await main(CONFIG);
  await exitProcess(0);
}
