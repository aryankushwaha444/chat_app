import React, { useEffect, useState, useContext, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { AuthContext } from "../auth/authContext";
import api from "../api";
import { MessageItem } from "./messageItem";

interface ChatMessage {
  id?: string;
  username: string;
  message: string;
  createdAt?: string;
}

export const Chat: React.FC = () => {
  const { token, user } = useContext(AuthContext);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const [counts, setCounts] = useState<{
    totalUsers: number;
    totalChats: number;
  } | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // fetch initial stats
    if (token) {
      api
        .get("/stats/counts")
        .then((res) => setCounts(res.data))
        .catch(() => {});
    }
  }, [token]);

  useEffect(() => {
    // connect socket
    const url = import.meta.env.VITE_SOCKET_URL || "http://localhost:4000";
    const options: any = {};
    if (token) options.query = { token };

    const s = io(url, options);
    socketRef.current = s;

    s.on("connect", () => {
      console.log("socket connected", s.id);
    });

    s.on("message", (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
      setCounts((prev) =>
        prev ? { ...prev, totalChats: prev.totalChats + 1 } : prev
      );
    });

    s.on("user:join", (payload: any) => {
      setMessages((prev) => [
        ...prev,
        { username: "System", message: `${payload.username} joined` },
      ]);
    });

    return () => {
      s.disconnect();
    };
  }, [token]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (e?: React.FormEvent) => {
    e?.preventDefault();
    const s = socketRef.current;
    if (!s) return;
    const trimmed = text.trim();
    if (!trimmed) return;
    s.emit("message", { message: trimmed });
    setText("");
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 border rounded">
      <div className="p-4 border-b flex justify-between">
        <div>
          <strong>Live Chat</strong>
          <div className="text-xs text-gray-500">
            You are: {user?.name || "Guest"}
          </div>
        </div>
        <div className="text-right text-sm">
          <div>Users: {counts?.totalUsers ?? "-"}</div>
          <div>Messages: {counts?.totalChats ?? "-"}</div>
        </div>
      </div>

      <div className="h-96 overflow-auto p-2 bg-gray-50">
        {messages.map((m, i) => (
          <MessageItem
            key={i}
            username={m.username}
            message={m.message}
            createdAt={m.createdAt}
          />
        ))}
        <div ref={endRef} />
      </div>

      <form onSubmit={send} className="p-4 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded"
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Send
        </button>
      </form>
    </div>
  );
};
