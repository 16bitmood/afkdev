import { WebTerm } from "./webterm";
import { BadRequest } from "../errors";
import { USERS } from "../config";

export type WebApp = any;

const getUserAppConfig = (username: string, app: "term"): any => {
  const user = USERS.filter((u) => u.username === username)[0];
  switch (app) {
    case "term":
      return user.apps.term;
  }
};

export function makeApp(appName: string, username: string) {
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
}
