// External Dependencies
import express from "express";
import http from "http";
import https from "https";

// Internal Imports
import {
  CLIENT_BUILD_PATH,
  APP_PORT,
  APP_ORIGIN,
  APP_SERVER_OPTIONS,
} from "./config";

import { router } from "./routes";
import { handleWS } from "./websockets";
import { logger } from "./logging";
import { sessionParser } from "./session";

// Globals
const app = express();

// Basic
app.use(express.json());
app.use(sessionParser);
app.use(logger);

// Serve Frontend
app.use(express.static(CLIENT_BUILD_PATH));

// API Routes
app.use(router);

let server: http.Server;
// Server
if (APP_SERVER_OPTIONS) {
  server = https.createServer(APP_SERVER_OPTIONS, app);
} else {
  server = http.createServer(app);
}

// WebSockets
handleWS(server);

// Start
server.listen(APP_PORT, () => console.log(`server at ${APP_ORIGIN} started`));
