import { ServerOptions } from "https";

import fs from "fs";
import path from "path";
import { PROJECT_ROOT } from "./client";

export const {
  NODE_ENV = "development",
  APP_PORT = 3000,
  APP_HOSTNAME = "localhost",
  APP_PROTOCOL = "http",
} = process.env;

export const APP_ORIGIN = `${APP_PROTOCOL}://${APP_HOSTNAME}:${APP_PORT}`;
export const IN_PROD = NODE_ENV === "production";

export const APP_SERVER_OPTIONS: ServerOptions | null =
  APP_PROTOCOL === "https"
    ? {
        key: fs.readFileSync(path.join(PROJECT_ROOT, "/.env.d/key.pem")),
        cert: fs.readFileSync(path.join(PROJECT_ROOT, "/.env.d/cert.pem")),
      }
    : null;
