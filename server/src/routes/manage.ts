import { Router } from "express";

import { isLoggedIn, setSessionApp, genSessionAppId } from "../session";
import { BadRequest } from "../errors";
import { makeApp } from "../webapps";

const router = Router();

router.put("/manage/create/:appName", (req, res) => {
  if (!isLoggedIn(req) || !req.session.username) {
    // TODO: session type is messed up
    throw new BadRequest("Client must be logged in to access /manage");
  }
  const { appName } = req.params;
  const app = makeApp(appName, req.session.username);
  const id = genSessionAppId(req);
  setSessionApp(req, id, app);

  res.json({ appId: id });
});

export { router as manage };
