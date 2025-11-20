import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { connectDB } from "./config/db";
import { registerChatSocket } from "./sockets/chatSocket";

const PORT = process.env.PORT || 4000;

const start = async () => {
  await connectDB();

  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  registerChatSocket(io);

  server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
