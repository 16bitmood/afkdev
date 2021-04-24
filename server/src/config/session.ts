import { SessionOptions } from "express-session";
import { IN_PROD } from "./app";
const HALF_HOUR = 1000 * 60 * 30;

export const {
  SESSION_SECRET = "default_session_secret",
  SESSION_NAME = "default_session_name",
  SESSION_IDLE_TIMEOUT = HALF_HOUR,
} = process.env;

export const SESSION_OPTIONS: SessionOptions = {
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  cookie: {
    maxAge: +SESSION_IDLE_TIMEOUT,
    secure: IN_PROD,
    sameSite: true,
  },
  rolling: true,
  resave: false,
  saveUninitialized: false,
};
