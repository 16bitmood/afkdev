export const {
  NODE_ENV = "development",
  APP_PORT = 3000,
  APP_HOSTNAME = "localhost",
  APP_PROTOCOL = "http",
} = process.env;

export const APP_ORIGIN = `${APP_PROTOCOL}://${APP_HOSTNAME}:${APP_PORT}`;
export const IN_PROD = NODE_ENV === "production";
