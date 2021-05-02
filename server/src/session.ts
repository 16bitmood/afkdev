// External Imports
import type { Request, Response } from "express";
import session from "express-session";
import type { WebApp } from "./webapps";

// Internal Imports
import { SESSION_OPTIONS } from "./config";
import { Unauthorized, BadRequest } from "./errors";

// Declarations
declare module "express-session" {
  export interface SessionData {
    username: string;
    ip: string;
    loggedInAt: number;
  }
}

// Globals
export const sessionParser = session(SESSION_OPTIONS);
export const sessionApps = new Map<string, Map<number, WebApp>>();

// Functions
export const isLoggedIn = (req: Request): boolean => !!req.session.username;

export const logIn = (req: Request, username: string): void => {
  req.session.username = username;
  req.session.loggedInAt = Date.now();
  req.session.ip = req.ip;

  sessionApps.set(req.sessionID, new Map());
};

export const logOut = (req: Request, res: Response): void => {
  if (!isLoggedIn(req)) {
    throw new Unauthorized();
  }

  // eslint-disable-next-line
  const apps = sessionApps.get(req.sessionID)!;
  apps.forEach((app) => app.close());
  sessionApps.delete(req.sessionID);

  req.session.destroy((err: Error) => {
    if (err) {
      console.error(`${err  }Unimplemented`);
    }
    res.json({message: "OK"});
  });
};

export const getSessionApp = (req: Request, appId: number): WebApp => {
  if (!isLoggedIn(req)) {
    throw new Unauthorized();
  }

  // eslint-disable-next-line
  const apps = sessionApps.get(req.sessionID)!;
  const app = apps.get(appId);

  if (!app) {
    throw new BadRequest("App does not exist");
  }
  return app;
};

export const setSessionApp = (
  req: Request,
  appId: number,
  app: WebApp
): void => {
  if (!isLoggedIn(req)) {
    throw new Unauthorized();
  }

  sessionApps.get(req.sessionID)?.set(appId, app);
};

export const deleteSessionApp = (req: Request, appId: number): void => {
  if (!isLoggedIn(req)) {
    throw new Unauthorized();
  }

  // eslint-disable-next-line
  const app = sessionApps.get(req.sessionID)?.get(appId);
  if (app) {
    app.close();
    sessionApps.get(req.sessionID)?.delete(appId);
  } else {
    throw new BadRequest("App does not exist");
  }
};
