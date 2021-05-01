import { ServerOptions } from 'https';

import fs from "fs";
import path from "path";
import { PROJECT_ROOT } from './client';

export const {
  NODE_ENV = "development",
  APP_PORT = 3000,
  APP_HOSTNAME = "localhost",
  APP_PROTOCOL = "http",
} = process.env;

export const APP_ORIGIN = `${APP_PROTOCOL}://${APP_HOSTNAME}:${APP_PORT}`;
export const IN_PROD = NODE_ENV === "production";

export let APP_SERVER_OPTIONS: ServerOptions;

if (APP_PROTOCOL === 'https') {
  APP_SERVER_OPTIONS = {
    key: fs.readFileSync(path.join(PROJECT_ROOT,'/.env.d/key.pem')),
    cert: fs.readFileSync(path.join(PROJECT_ROOT,'/.env.d/cert.pem'))
  }
}