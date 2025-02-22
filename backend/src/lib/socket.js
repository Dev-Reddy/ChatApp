import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const CLIENT_URL = process.env.CLIENT_URL;

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [CLIENT_URL, "http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true, // Allow cookies
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// stores online users
const userSocketMap = {}; //{userId: socketId}

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
