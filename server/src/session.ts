// External Imports
import type {  Request, Response } from 'express';
import session from 'express-session';
import type { WebApp } from './webapps';

// Internal Imports
import {
    SESSION_OPTIONS,
    SESSION_NAME
} from './config';
import { Unauthorized, BadRequest } from './errors';

// Declarations
declare module 'express-session' {
    export interface SessionData {
        username: string,
        ip: string,
        loggedInAt: number,
        apps: Map<number, WebApp>
    }
}

// Globals
export const sessionParser = session(SESSION_OPTIONS);

// Functions
export function isLoggedIn(req: Request): boolean {
    return !!req.session.username;
}

export function logIn(req: Request, username: string): void {
    req.session.username = username;
    req.session.loggedInAt = Date.now();
    req.session.ip = req.ip;
    req.session.apps = new Map();
}

export function logOut(req: Request, res: Response): void {
    if (!isLoggedIn(req)) {
        throw new Unauthorized();
    }
    // eslint-disable-next-line
    req.session.apps!.forEach(app => app.close());
    req.session.destroy((err: Error) => {
        if (err) {
            console.error('Unimplemented');
        }
        res.clearCookie(SESSION_NAME);
    });
}

export function getSessionApp(req: Request, app_id: number): WebApp {
    if (!isLoggedIn(req)) {
        throw new Unauthorized();
    }

    // eslint-disable-next-line
    const app = req.session.apps!.get(app_id);
    if(!app) {
        throw new BadRequest('App does not exist');
    }
    return app;
}


export function setSessionApp(req: Request, app_id: number, app: WebApp): void {
    if (!isLoggedIn(req)) {
        throw new Unauthorized();
    }

    req.session.apps!.set(app_id, app);
}

export function deleteSessionApp(req: Request, app_id: number): void {
    if (!isLoggedIn(req)) {
        throw new Unauthorized();
    }

    // eslint-disable-next-line
    const app = req.session.apps!.get(app_id);
    if (app) {
        app.close();
        req.session.apps!.delete(app_id);
    } else {
        throw new BadRequest('App does not exist');
    }
}