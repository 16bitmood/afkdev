import WebSocket from 'ws';
import type { Server } from 'http';
import type { Response } from 'express';

import { sessionParser, getSessionApp } from './session';
import { WebApp } from './webapps';
import { Unauthorized } from './errors';


function parseAppId(u: string) {
    const fullURL = new URL(u, 'http://dummy');
    const appId = fullURL.searchParams.get('appId');
    return parseInt(appId as string);
}

const wss = new WebSocket.Server({
    clientTracking: false, // TODO: what is this?
    noServer: true ,
    path: '/_connect'
});

export function handleWS(server: Server) {
    server.on('upgrade', (req, socket, head) => {
        sessionParser(req, {} as Response , () => {
            try {
                const appId = parseAppId(req.url);
                const app: WebApp = getSessionApp(req, appId);

                wss.handleUpgrade(req, socket, head, (ws) => {
                    app.connect(ws);
                    wss.emit('connection', ws, req);
                });

            } catch (err) {
                if (err instanceof Unauthorized ) {
                    socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
                    socket.destroy();

                } else {
                    socket.write('HTTP/1.1 400 Bad Request\r\n\r\n');
                    socket.destroy();
                    return;
                }
            }

        });
    });
}