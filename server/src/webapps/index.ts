import { WebTerm } from "./webterm";
import { BadRequest } from "../errors";
import { USERS } from "../config";

// Add others as sum types
export type WebApp = WebTerm;
export type WebAppConfig = { cmd: string; args: string[] };

const getUserAppConfig = (username: string, app: "term"): WebAppConfig => {
  const [user] = USERS.filter((u) => u.username === username);
  switch (app) {
    case "term":
      return user.apps.term;
    default:
      throw new Error("Invalid App");
  }
};

export const makeApp = (appName: string, username: string): WebApp => {
  switch (appName) {
    case "term": {
      const { cmd, args } = getUserAppConfig(username, "term");

      return new WebTerm(cmd, args, {
        cols: 90,
        rows: 90,
      });
    }

    case "fileManager":
      throw new BadRequest(`program ${appName} not implemented`);

    default:
      throw new BadRequest(`program ${appName} not found`);
  }
};
