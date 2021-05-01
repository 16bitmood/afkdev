import { WebTerm } from "./webterm";
import { BadRequest } from "../errors";

export type WebApp = any;

export function makeApp(appName: string): WebApp {
  switch (appName) {
    case "term":
      return new WebTerm("docker", ["run","-it", "alpine"], { cols: 90, rows: 90 });

    case "fileManager":
      throw new BadRequest(`program ${appName} not implemented`);

    default:
      throw new BadRequest(`program ${appName} not found`);
  }
}
