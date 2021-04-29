import { Router } from "express";

import { isLoggedIn } from "../session";
import { BadRequest } from "../errors";

import { makeApp } from "../webapps";

import { setSessionApp } from "../session";

const router = Router();

router.get("/stats", (req, res) => {
  if (!isLoggedIn(req)) {
    throw new BadRequest("Client must be logged in to access /statistics");
  }

  res.json({ 'ip': req.ip });
});

export { router as stats };
