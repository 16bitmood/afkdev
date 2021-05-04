import { spawn, IPty, IPtyForkOptions } from "node-pty";
import WebSocket from "ws";
import { BadRequest } from "../errors";

function buffer(socket: WebSocket, timeout: number) {
  let s = "";
  let sender: null | NodeJS.Timeout = null;
  return (data: string) => {
    s += data;
    if (!sender) {
      sender = setTimeout(() => {
        socket.send(s);
        s = "";
        sender = null;
      }, timeout);
    }
  };
}

enum WTData {
  // Client -> Server
  CLIENT_DATA = "0",
  CLIENT_UPDATE = "1",

  // Server -> Client
  SERVER_DATA = "0",
}

interface WebTermCommand {
  option?: string;
  cols?: number;
  rows?: number;
}

export class WebTerm {
  public pid: number;

  private initialData: string;

  private term: IPty;

  constructor(cmd: string, params: string[], termOptions: IPtyForkOptions) {
    this.initialData = "";
    this.term = spawn(cmd, params, termOptions);
    this.term.onData((data) => {
      this.initialData += data;
    });
    this.pid = this.term.pid;

    console.info(`Spawned: ${this.pid}`);
  }

  resize(cols: number, rows: number): void {
    this.term.resize(cols, rows);
  }

  close(): void {
    this.term.kill();
  }

  connect(ws: WebSocket): void {
    ws.send(WTData.SERVER_DATA + this.initialData);

    this.term.onData((data) => {
      buffer(ws, 5)(WTData.SERVER_DATA + data);
    });

    this.term.onExit((ev) => {
      console.log("term quit:", ev);
      ws.close();
    });

    ws.on("message", (msg) => {
      const cmd = (msg as string)[0] as WTData;
      const data = (msg as string).slice(1);
      switch (cmd) {
        case WTData.CLIENT_DATA:
          this.term.write(data);
          break;
        case WTData.CLIENT_UPDATE:
          this.update(JSON.parse(data));
          break;
        default:
          console.error(`Invalid Command! ${msg}`);
      }
    });

    ws.on("close", () => {
      this.term.kill();
    });
  }

  public update(command: WebTermCommand): { result: string } {
    if (!command.option) {
      throw new BadRequest("Command not specified!");
    }
    switch (command.option) {
      case "resize": {
        const { cols, rows } = command;
        if (!cols || !rows) {
          console.log("error: ", cols, rows);
          return { result: "Ok" };
          // temp
          // throw new BadRequest("Invalid Command");
        }
        this.resize(cols, rows);
        return { result: "Ok" };
      }

      default:
        throw new BadRequest("Unknown Command!");
    }
  }
}
