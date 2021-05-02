import type { Request, Response, NextFunction } from "express";
import { IN_PROD } from "./config";
import { isLoggedIn } from "./session";

const devLogger = (req: Request, _res: Response, next: NextFunction) => {
  const sess = isLoggedIn(req) ? req.sessionID : "LoggedOut";
  console.log(
    `[${sess}]: ${req.url} ${req.method} ${req.body ? req.body : ""}`
  );
  next();
};

/* eslint-disable */
const prodLogger = (_req: Request, _res: Response, _next: NextFunction) => {
  throw new Error("Not Implemented Yet!");
};
/* eslint-enable */

export const logger: (
  req: Request,
  res: Response,
  next: NextFunction
) => void = IN_PROD ? prodLogger : devLogger;
