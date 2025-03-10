import { CPROP, SourceSchema } from '@rfmain/config';
import {
  SentinelAppName,
  NodeEnv,
  PreloadedEnvVars,
  LocalConfigVariables,
  SecretKeys,
  SentinelMongoDbLocations,
  SentinelMongoDbName,
  SpyDataFileExtension,
} from '@rfmain/types/enums';
import { endOfMonth, startOfMonth, subMonths } from 'date-fns';
import { daysToMs, hoursToMs, minutesToMs, secondsToMs } from '@rfmain/util/date';

export const rfmdc: Partial<SourceSchema> = {
  NODE_ENV: CPROP.NODE_ENV(NodeEnv.development),
  APP_NAME: CPROP.APP_NAME(SentinelAppName.playground),
  CURRENT_WORKING_DIR: CPROP.CURRENT_WORKING_DIR('/workspaces/RFMain'),
  APPDATA_DIR_MANAGER: CPROP.APPDATA_DIR_MANAGER('appdata'),

  GRAPH_CLIENT_AUTH_OPTIONS: CPROP.GRAPH_CLIENT_AUTH_OPTIONS({
    tenantId: CPROP.AZURE_TENANT_ID(PreloadedEnvVars.AZURE_TENANT_ID),
    clientId: CPROP.AZURE_CLIENT_ID(PreloadedEnvVars.AZURE_CLIENT_ID),
    clientSecret: CPROP.AZURE_CLIENT_SECRET(PreloadedEnvVars.AZURE_CLIENT_SECRET),
    tokenExpiryRenewalWindow: CPROP.TOKEN_EXPIRY_RENEWAL_WINDOW(minutesToMs(5)),
  }),
  LOGGER: CPROP.LOGGER({
    logs: [
      { type: 'redirect', level: 2 },
      {
        type: 'file',
        level: 3,
        fileMaxAge: daysToMs(7),
      },
    ],
    shouldSendEmailOnFatalError: false,
  }),
  MONGO_URI_LOCAL: CPROP.MONGO_URI_LOCAL('mongodb://localhost:27017'),
  MONGO_URI_CLOUD: CPROP.MONGO_URI_CLOUD({ secret: SecretKeys.MONGO_URI_CLOUD }),
  APPDATA_CONNECTION: CPROP.APPDATA_CONNECTION({
    location: SentinelMongoDbLocations.local,
    dbName: SentinelMongoDbName.appdata,
  }),
  BUSINESSDATA_CONNECTION: CPROP.BUSINESSDATA_CONNECTION({
    location: SentinelMongoDbLocations.local,
    dbName: SentinelMongoDbName.rfcopy,
  }),
  REFERENCEDATA_CONNECTION: CPROP.REFERENCEDATA_CONNECTION({
    location: SentinelMongoDbLocations.local,
    dbName: SentinelMongoDbName.referencedata,
  }),
  SERVICE_ACCOUNT_EMAIL: CPROP.SERVICE_ACCOUNT_EMAIL('bi@redefinedfashion.dk'),
  OWN_EMAIL_ADDRESS: CPROP.OWN_EMAIL_ADDRESS({ local: LocalConfigVariables.ownEmail }),
  DOWNLOADS_DIR: CPROP.DOWNLOADS_DIR('/home/node/Downloads'),
  FRONTEND_DIST_DIR: CPROP.FRONTEND_DIST_DIR('.dist/react-webinterface'),
  SPY_ROBOT_SOURCE_FILE_DEFAULT_MAX_AGE: CPROP.SPY_ROBOT_SOURCE_FILE_DEFAULT_MAX_AGE(
    hoursToMs(6),
  ),

  API_SERVER_HOST: CPROP.API_SERVER_HOST('localhost'),
  API_SERVER_PORT: CPROP.API_SERVER_PORT(3001),
  SALES_INVOICED_REBUILD_START_DATE: CPROP.SALES_INVOICED_REBUILD_START_DATE('2020-07-01'),
  SALES_INVOICED_REBUILD_END_DATE: CPROP.SALES_INVOICED_REBUILD_END_DATE(
    endOfMonth(new Date()),
  ),
  SALES_INVOICED_REBUILD_MONTHS_PER_DIVISION:
    CPROP.SALES_INVOICED_REBUILD_MONTHS_PER_DIVISION(6),
  SALES_INVOICED_REBUILD_ROBOT_TIMEOUT: CPROP.SALES_INVOICED_REBUILD_ROBOT_TIMEOUT(
    hoursToMs(4),
  ),
  SALES_INVOICED_UPDATE_START_DATE: CPROP.SALES_INVOICED_UPDATE_START_DATE(
    startOfMonth(subMonths(new Date(), 1)),
  ),
  SALES_INVOICED_UPDATE_END_DATE: CPROP.SALES_INVOICED_UPDATE_END_DATE(endOfMonth(new Date())),
  SALES_INVOICED_UPDATE_ROBOT_TIMEOUT: CPROP.SALES_INVOICED_UPDATE_ROBOT_TIMEOUT(hoursToMs(1)),
  ROBOT_OPTIONS: CPROP.ROBOT_OPTIONS({
    headless: true,
    width: 1600,
    height: 900,
    timeout: minutesToMs(4),
    protocolTimeout: minutesToMs(3),
    defaultWaitForMilliseconds: secondsToMs(2),
    defaultDownloadWaitForMilliseconds: secondsToMs(10),
    navigationTimeout: minutesToMs(10),
    closeBrowser: true,
    callbackTimeout: minutesToMs(10),
    // downloadsDir: '/home/node/Downloads',
    executablePath: '/usr/bin/google-chrome-stable',
  }),
  SPY_WEB_USERS_JSON: CPROP.SPY_WEB_USERS_JSON({
    secretSetting: { secret: SecretKeys.SPY_WEB_USERS_JSON },
    indexRange: [7, 10],
  }),
  HAKIO_HOST: CPROP.HAKIO_HOST({ secret: SecretKeys.HAKIO_HOST }),
  HAKIO_PORT: CPROP.HAKIO_PORT({ secret: SecretKeys.HAKIO_PORT }),
  HAKIO_USER: CPROP.HAKIO_USER({ secret: SecretKeys.HAKIO_USER }),
  HAKIO_PASS: CPROP.HAKIO_PASS({ secret: SecretKeys.HAKIO_PASS }),

  GET_EMAILS_OPTIONS: CPROP.GET_EMAILS_OPTIONS({
    pollingInterval: secondsToMs(10),
    msGraphAPISettleTime: secondsToMs(5),
    emailPollTimeout: hoursToMs(1),
    msGraphAPIStorePollCount: 5,
  }),
  SEND_EMAIL_OPTIONS: CPROP.SEND_EMAIL_OPTIONS({
    forceSend: true,
  }),
  STYLES_ROBOT_TIMEOUT: CPROP.STYLES_ROBOT_TIMEOUT(hoursToMs(1)),
  EMAIL_TEMPLATE_EXPIRATION_TIME: CPROP.EMAIL_TEMPLATE_EXPIRATION_TIME(minutesToMs(5)),
  EMAIL_PRIVATE_RECIPIENT_OPTIONS: CPROP.EMAIL_PRIVATE_RECIPIENT_OPTIONS({
    shouldSendPublicly: false,
    // localEmail: CPROP.OWN_EMAIL_ADDRESS({ local: LocalConfigVariables.ownEmail }),
  }),
  ADMIN_ROBOT_TIMEOUT: CPROP.ADMIN_ROBOT_TIMEOUT(minutesToMs(20)),
  SINGLE_FILE_RDE_ROBOT_TIMEOUT: CPROP.SINGLE_FILE_RDE_ROBOT_TIMEOUT(minutesToMs(30)),
  MONGODB_MIGRATE_CONNECTIONS: CPROP.MONGODB_MIGRATE_CONNECTIONS({
    source: {
      location: SentinelMongoDbLocations.local,
      dbName: SentinelMongoDbName.rfcopy,
    },
    target: {
      location: SentinelMongoDbLocations.local,
      dbName: SentinelMongoDbName.rfsrc,
    },
  }),
  ROBOT_OUTPUT_FILE_MAX_AGE: CPROP.ROBOT_OUTPUT_FILE_MAX_AGE(hoursToMs(6)),
  BARCODES_FILE: CPROP.BARCODES_FILE({
    filename: 'Barcode Excel',
    fileExtension: SpyDataFileExtension.xlsx,
  }),
  STYLES_DETAILS_FILE: CPROP.STYLES_DETAILS_FILE({
    filename: 'Styles Details',
    fileExtension: SpyDataFileExtension.xlsx,
  }),
  CANCELLED_STYLES_FILE: CPROP.CANCELLED_STYLES_FILE({
    filename: 'Styles Cancelled - Style Details',
    fileExtension: SpyDataFileExtension.xlsx,
  }),
  EXPORT_STYLES_FILE: CPROP.EXPORT_STYLES_FILE({
    filename: 'Export styles',
    fileExtension: SpyDataFileExtension.xlsx,
  }),
  STYLES_STATISTICS_FILE: CPROP.STYLES_STATISTICS_FILE({
    filename: 'Styles Statistics',
    fileExtension: SpyDataFileExtension.xlsx,
  }),
  CUSTOMERS_FILE: CPROP.CUSTOMERS_FILE({
    filename: 'Customers',
    fileExtension: SpyDataFileExtension.xlsx,
  }),
  ZALANDO_CONSIGNMENT_FILE: CPROP.ZALANDO_CONSIGNMENT_FILE({
    filename: 'Styles_Details',
    fileExtension: SpyDataFileExtension.xlsx,
  }),
  UPDATEDB_CONCURRENCY: CPROP.UPDATEDB_CONCURRENCY(3),
  UPDATEDB_TASK_TIMEOUT: CPROP.UPDATEDB_TASK_TIMEOUT(hoursToMs(2)),
  UPDATEDB_SUCCESS_COOLDOWN_TIME: CPROP.UPDATEDB_SUCCESS_COOLDOWN_TIME(hoursToMs(6)),
  UPDATEDB_TASK_RETRIES: CPROP.UPDATEDB_TASK_RETRIES(3),
  UPDATEDB_RUN_COMMAND: CPROP.UPDATEDB_RUN_COMMAND(['npm', 'run', 'update-db']),
  PUPPETEER_EXECUTABLE_PATH: CPROP.PUPPETEER_EXECUTABLE_PATH('/usr/bin/google-chrome-stable'),
  TERMINAL_MAX_STRING_LENGTH: CPROP.TERMINAL_MAX_STRING_LENGTH(10000),
  MONGO_SENTINEL_USER: CPROP.MONGO_SENTINEL_USER({ secret: SecretKeys.MONGO_SENTINEL_USER }),
  MONGO_SENTINEL_PASS: CPROP.MONGO_SENTINEL_PASS({ secret: SecretKeys.MONGO_SENTINEL_PASS }),
  ZDIRECT_EMAIL: CPROP.ZDIRECT_EMAIL({ local: LocalConfigVariables.ownEmail }),
  ZDIRECT_PASSWORD: CPROP.ZDIRECT_PASSWORD({ secret: SecretKeys.ZDIRECT_PASSWORD }),
  SSL_PRIVKEY_PEM: CPROP.SSL_PRIVKEY_PEM({ secret: SecretKeys.SSL_PRIVKEY_PEM }),
  SSL_FULLCHAIN_PEM: CPROP.SSL_FULLCHAIN_PEM({ secret: SecretKeys.SSL_FULLCHAIN_PEM }),
  PLAYGROUND_ENTRYPOINT_PATH: CPROP.PLAYGROUND_ENTRYPOINT_PATH('apps/playground/src/main.ts'),
  CONFIG_LIB_README_PATH: CPROP.CONFIG_LIB_README_PATH('libs/config/README.md'),
  AZURE_TENANT_ID: CPROP.AZURE_TENANT_ID(PreloadedEnvVars.AZURE_TENANT_ID),
  AZURE_CLIENT_ID: CPROP.AZURE_CLIENT_ID(PreloadedEnvVars.AZURE_CLIENT_ID),
  AZURE_CLIENT_SECRET: CPROP.AZURE_CLIENT_SECRET(PreloadedEnvVars.AZURE_CLIENT_SECRET),
  TOKEN_EXPIRY_RENEWAL_WINDOW: CPROP.TOKEN_EXPIRY_RENEWAL_WINDOW(minutesToMs(5)),
  FORCE_SEND_ALL_EMAILS: CPROP.FORCE_SEND_ALL_EMAILS(false),
  RF_SFTP_HOST: CPROP.RF_SFTP_HOST({ secret: SecretKeys.RF_SFTP_HOST }),
  RF_SFTP_PORT: CPROP.RF_SFTP_PORT({ secret: SecretKeys.RF_SFTP_PORT }),
  RF_SFTP_USER: CPROP.RF_SFTP_USER({ secret: SecretKeys.RF_SFTP_USER }),
  RF_SFTP_PASS: CPROP.RF_SFTP_PASS({ secret: SecretKeys.RF_SFTP_PASS }),
  CREDIT_SAFE_EXPORT_NAME: CPROP.CREDIT_SAFE_EXPORT_NAME('bi-export'),
};
