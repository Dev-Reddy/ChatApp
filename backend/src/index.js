import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;

const CLIENT_URL = process.env.CLIENT_URL;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*", // Allow frontend
    credentials: true, // Allow cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  return res
    .status(200)
    .send(
      "Welcome to the messenger backend! But hey, you are not supposed to be here!!! How did you get here? Please contact me you amazing hacker and teach me how did you do it."
    );
});

server.listen(PORT || 3000, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
