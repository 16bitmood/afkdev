import fs from "fs";
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
    this.ws = ws;
    ws.on("message", this.handleCommand);

    ws.on("close", () => console.info("File Manager Closed"));
  }

  public async handleCommand(command: WebFileManagerCommand): Promise<void> {
    try {
      switch (command.option) {
        case "get": {
          const files = await fs.promises.readdir(command.path);
          this.ws?.send({ result: files });
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
          this.ws?.send({ error: "Invalid Command" });
      }
    } catch (e) {
      this.ws?.send({ error: e });
    }
  }
}
