import express from "express";
import { AuthController } from "./auth.controller";
import { authenticate } from "./auth.middleware";

const router = express.Router();

router.post("/login", AuthController.loginWithEmailAndPassword);
router.post("/logout", AuthController.logout);
router.get("/me", authenticate, AuthController.me);

export const authRouter = router;
