import { Router } from "express";

import { isLoggedIn } from "../session";
import { BadRequest } from "../errors";

const router = Router();

router.get("/stats", (req, res) => {
  if (!isLoggedIn(req)) {
    throw new BadRequest("Client must be logged in to access /stats");
  }

  res.json({
      'ip': (req.ip === '::ffff:127.0.0.1' || req.ip === '::1') ? 'localhost' : req.ip,
  });

});

export { router as stats };