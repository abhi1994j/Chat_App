import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { connectDB } from "./src/config/db.js";
import { connectENV } from "./src/config/env.js";
import { corsConfig } from "./src/config/cors.js";
import { authRouter } from "./src/routes/auth.route.js";
import { messageRouter } from "./src/routes/message.route.js";

import path from "path";


const app = express();

app.use(helmet());
app.use(morgan("combined", {
  skip: function (req, res) { return res.statusCode < 400 }
}))
app.use(corsConfig());
connectENV();
connectDB();

// app.use(express.json());
app.use(express.json({ limit: "10mb" }));  // allow JSON payload up to 10MB
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cookieParser());

const PORT = process.env.PORT || 8000;

app.use("/api/v1/chat", authRouter);
app.use("/api/v1/chat", messageRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../FRONTEND/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../FRONTEND", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`server is running in ${PORT}`);
})
