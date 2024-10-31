import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

// userSocketMap tracks which users are currenctly online
const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId; // coming from socketContext.jsx file in frontend
  if (userId != "undefined") userSocketMap[userId] = socket.id;
  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap)); // thi line tells who is online and who is offline

  // socket.on() is used to listen to the events. can be used both on client and server side
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // thi line tells who is online and who is offline
  });
});

export { app, io, server };
