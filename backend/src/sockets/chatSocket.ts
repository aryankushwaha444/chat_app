import { Server, Socket } from "socket.io";
import Chat from "../models/chat";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secret";

// attach handlers to io
export function registerChatSocket(io: Server) {
  io.on("connection", (socket: Socket) => {
    // optional token-based auth on socket:
    const token = socket.handshake.query?.token as string | undefined;
    let userInfo: any = null;
    if (token) {
      try {
        userInfo = jwt.verify(token, JWT_SECRET);
      } catch {}
    }

    const username = userInfo?.name || "Anonymous";

    // notify others
    io.emit("user:join", { socketId: socket.id, username });

    // listen to incoming message
    socket.on("message", async (payload: { message: string }) => {
      const msg = payload.message?.trim();
      if (!msg) return;

      // Save chat if userId exists
      try {
        const chat = await Chat.create({
          userId: userInfo?.id || null,
          username,
          message: msg,
        });
        const out = {
          id: chat._id,
          userId: chat.userId,
          username: chat.username,
          message: chat.message,
          createdAt: chat.createdAt,
        };
        io.emit("message", out); // broadcast
      } catch (err) {
        console.error("Failed to save chat:", err);
      }
    });

    socket.on("disconnect", () => {
      io.emit("user:left", { socketId: socket.id, username });
    });
  });
}
