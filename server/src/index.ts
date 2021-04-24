// External Dependencies
import express from 'express';
import http from 'http';

// Internal Imports
import {
    CLIENT_BUILD_PATH,
    APP_PORT,
    APP_ORIGIN
} from './config';

import { router } from './routes';
import { handleWS } from './websockets';
import { logger } from './logging';
import { sessionParser } from './session';

// Globals
const app = express();

// Basic
app.use(express.json());
app.use(logger);
app.use(sessionParser);

// Serve Frontend
app.use(express.static(CLIENT_BUILD_PATH));

// API Routes
app.use(router);

// Server
const server = http.createServer(app);

// WebSockets
handleWS(server);

// Start
server.listen(APP_PORT, () => console.log(`server at ${APP_ORIGIN} started`));


// Server