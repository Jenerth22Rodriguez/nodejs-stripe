import { Router } from "express";
import { createSession } from "../controllers/payment.controllers.js";
import path from "path";

const router = Router();

router.post("/create-checkout-session", createSession);

router.get("/success", (req, res) =>
  res.sendFile("success.html", { root: "src/public" })
);

router.get("/cancel", (req, res) =>
  res.sendFile("cancel.html", { root: "src/public" })
);

export default router;
