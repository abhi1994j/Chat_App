import express from "express";
import { getMessages, getUsersForSiderbars, sendMessages } from "../controllers/message.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

const messageRouter = express.Router();

messageRouter.get("/users", protectedRoute, getUsersForSiderbars );
messageRouter.get("/:id", protectedRoute , getMessages)
messageRouter.post("/send/:id",protectedRoute, sendMessages );


export {messageRouter};