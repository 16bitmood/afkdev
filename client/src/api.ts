import axios from "axios";

// Errors
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

// Api
export const logIn = async (
  username: string,
  password: string
): Promise<boolean> => {
  try {
    const res = await axios.post("/api/login", { username, password });
    return res.status === 200;
  } catch (e) {
    return false;
  }
};

export const logOut = async (): Promise<boolean> => {
  try {
    const res = await axios.post("/api/logout");
    return res.status === 200;
  } catch (e) {
    return false;
  }
};

export const isLoggedIn = async (): Promise<boolean> => {
  try {
    const res = await axios.get("/api/isLoggedIn");
    return res.data.result === "yes";
  } catch (e) {
    return false;
  }
};

export const createApp = async (appName: string): Promise<number | null> => {
  try {
    const res = await axios.get(`/api/manage/create/${appName}`);
    return res.data.appId;
  } catch (e) {
    return null;
  }
};

export const getStats = async () => {
  try {
    const res = await axios.get("/api/stats");
    return res.data;
  } catch (e) {
    return { ip: "0.0.0.0" };
  }
};

export const connectWS = (appId: number) => {
  const makeWsUrl = (s : string): string => {
    const l = window.location;
    return (
      (l.protocol === "https:") ? "wss://" : "ws://")
      + l.hostname
      + (((l.port !== '80') && (l.port !== '443')) ? ":" + l.port : "")
      + l.pathname
      + s;
  }
  const wsUrl = makeWsUrl(`_connect?appId=${appId}`)
  console.log(wsUrl);
  return new WebSocket(wsUrl);
};
