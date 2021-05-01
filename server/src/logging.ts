import type { Request, Response, NextFunction } from "express";
import { IN_PROD } from "./config";
import { isLoggedIn } from "./session";

function devLogger(req: Request, _res: Response, next: NextFunction) {
  const sess = isLoggedIn(req) ? req.sessionID : "LoggedOut";
  console.log(
    `[${sess}]: ${req.url} ${req.method} ${req.body ? req.body : ""}`
  );
  next();
}

function prodLogger(_req: Request, _res: Response, _next: NextFunction) {
  throw new Error("Not Implemented Yet!");
}

export let logger: (req: Request, res: Response, next: NextFunction) => void;

if (IN_PROD) {
  logger = prodLogger;
} else {
  logger = devLogger;
}
