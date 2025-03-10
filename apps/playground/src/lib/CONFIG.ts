import { ConfigOf, SourceSchema } from '@rfmain/config';

export type PlaygroundConfig = ConfigOf<keyof SourceSchema>;

export const CONFIG = {} as PlaygroundConfig;
