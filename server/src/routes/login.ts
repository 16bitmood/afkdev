import { Router } from "express";
import crypto from "crypto";
import { USERS } from "../config";
import { isLoggedIn, logIn, logOut } from "../session";
import { BadRequest } from "../errors";

const router = Router();

const hashText = (text: string): string =>
  crypto.createHash("sha256").update(text).digest("hex");

const isVerified = (u: string, p: string): boolean => {
  const pHash = hashText(p);
  const matched = USERS.filter((userdat) => userdat.username === u)[0];
  if (!matched) {
    return false;
  }
  return pHash === matched.hashedPassword;
};

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
  }
  throw new BadRequest("Not Logged In!");
});

router.get("/isLoggedIn", (req, res) => {
  if (isLoggedIn(req)) {
    res.json({ result: "yes" });
  } else {
    res.json({ result: "no" });
  }
});

export { router as login };
