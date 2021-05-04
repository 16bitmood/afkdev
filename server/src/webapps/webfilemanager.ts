import fs from "fs";
import path from "path";
import WebSocket from "ws";

type WebFileManagerCommand =
  | {
      option: "get";
      path: string;
    }
  | {
      option: "create";
      path: string;
      data: string; // For Now Base64, use binary later
    }
  | {
      option: "delete";
      path: string;
    };

export class WebFileManager {
  private ws: WebSocket | null;

  constructor() {
    this.ws = null;
    console.info("Opened File Manager");
  }

  connect(ws: WebSocket): void {
    console.log('ws connected');
    this.ws = ws;
    ws.on("message", (d) => {console.log(d); this.handleCommand(JSON.parse(d as string))});

    ws.on("close", () => console.info("File Manager Closed"));
  }

  public async handleCommand(command: WebFileManagerCommand): Promise<void> {
    try {
      switch (command.option) {
        case "get": {
          const dirents = await fs.promises.readdir(command.path, {withFileTypes: true});
          const files = dirents.map(e => e.isDirectory() ? [e.name, null] : [e.name, path.extname(e.name)]);
          this.ws?.send(JSON.stringify({ result: files }));
          break;
        }
        case "create": {
          console.log("Create", command.path, command.data);
          break;
        }
        case "delete": {
          console.log("Create", command.path);
          break;
        }
        default:
          this.ws?.send(JSON.stringify({ error: "Invalid Command" }));
      }
    } catch (e) {
      this.ws?.send({ error: e });
    }
  }
}
