import { mdiTrayRemove } from "@mdi/js";
import axios from "axios";

export class Unauthorized extends Error {
  constructor(msg = "Unauthorized") {
    super(msg);
  }
}

export class BadRequest extends Error {
  constructor(msg = "Bad Request") {
    super(msg);
  }
}

export async function logIn(
  username: string,
  password: string
): Promise<boolean> {
  try {
    const res = await axios.post("/api/login", { username, password });
    return res.status === 200;
  } catch (e) {
    return false;
  }
}

export async function logOut(): Promise<boolean> {
  try {
    const res = await axios.post("/api/logout");
    return res.status === 200;
  } catch (e) {
    return false;
  }
}

export async function isLoggedIn(): Promise<boolean> {
  const res = await axios.get("/api/isLoggedIn");
  return res.data.result === "yes";
}

export async function createApp(appName: string): Promise<number> {
  const res = await axios.get(`/api/manage/create/${appName}`);
  if (res.status === 200) {
    return res.data.appId;
  } else if (res.status === 401) {
    throw new Unauthorized();
  } else {
    throw new BadRequest();
  }
}

export const connectWS = (appId: number) => {
  // TODO: change localhost to var
  const wsUrl = `ws://localhost:3000/_connect?appId=${appId}`;
  return new WebSocket(wsUrl);
};
