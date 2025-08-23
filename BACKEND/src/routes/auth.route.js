import express from "express";
import {  checkAuth, loginUser, logoutUser, signupUser, updateProfile } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", signupUser );
authRouter.post("/login", loginUser );
authRouter.post("/logout", logoutUser );
authRouter.put("/update-profile", protectedRoute , updateProfile);
authRouter.get("/check", protectedRoute , checkAuth)

export {authRouter};