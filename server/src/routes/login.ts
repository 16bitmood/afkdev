import { Router } from "express";

import { TEMP_PASSWORD, TEMP_USERNAME } from "../config";
import { isLoggedIn, logIn, logOut } from "../session";
import { BadRequest, Unauthorized } from "../errors";

const router = Router();

function isVerified(u: string, p: string): boolean {
  return u === TEMP_USERNAME && p === TEMP_PASSWORD;
}

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (isLoggedIn(req)) {
    throw new BadRequest("Already Logged In!");
  } else if (isVerified(username, password)) {
    logIn(req, username);
  } else {
    throw new BadRequest("Incorrect username or password!");
  }
  res.sendStatus(200);
});

router.post("/logout", (req, res) => {
  if (isLoggedIn(req)) {
      logOut(req, res);
      return res.sendStatus(200);
  } else {
    throw new BadRequest("Not Logged In!");
  }
});

router.get("/isLoggedIn", (req, res) => {
  if (isLoggedIn(req)) {
    res.json({ result: "yes" });
  } else {
    res.json({ result: "no" });
  }
});

export { router as login };
