import { Router } from "express";

import { login } from "./login";
import { manage } from "./manage";
import { stats } from "./stats";

export const router = Router();

router.use("/api", login);
router.use("/api", manage);
router.use("/api", stats);
router.get("/*", (_req, res) => {
  res.redirect("/");
});
