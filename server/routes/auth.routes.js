import { isAuthenticated, login, logout, register, resetPass, sendResetOtp, sendVerifyOtp, verifyEmail } from "../controllers/auth.controller.js";
import express from "express";
import userAuth from "../middleware/userAuth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);
authRouter.post("/verify-account", userAuth, verifyEmail);
authRouter.get("/is-auth", userAuth, isAuthenticated);
authRouter.post("/send-reset-otp", sendResetOtp);
authRouter.post("/reset-password", resetPass);

export default authRouter;