import { WebTerm } from "./webterm";
import { BadRequest } from "../errors";
import { USERS } from '../config';

const getUserAppConfig = (username: string, app: string) => {
  const user = USERS.filter(u => u.username === username)[0];
  return user.apps.term;
}

export function makeApp(appName: string, username: string)  {
  switch (appName) {
    case "term":
      const { cmd, args } = getUserAppConfig(username, 'term');

      return new WebTerm(cmd, args, {
        cols: 90,
        rows: 90,
      });

    case "fileManager":
      throw new BadRequest(`program ${appName} not implemented`);

    default:
      throw new BadRequest(`program ${appName} not found`);
  }
}
