// To run backend =>" npm run server" in root folder
//  we are able to use import in backend inplace of require cuz we write "type":"module" in package.json file
import path from "path";
import express from "express";
import { app, server } from "./socket/socket.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

// const app = express(); // we imported it in socket.io file , Now why we did it because we implemented the socket.io between database and user so that when user1 send a message it can be received by the user2 instantaneously without any lag and be saved in the database also.
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

app.use(express.json()); // used to work with req.body
app.use(cookieParser()); // use to get data from cookies

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// These 2 lines are needed to deploy
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// app.get("/", (req, resp) => {
//   resp.send("Hello world");
// });

// normally we use app.listen but for socket.io we use server coming from socket.js file
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
