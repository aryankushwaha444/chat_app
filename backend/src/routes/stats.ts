import { Router } from "express";
import User from "../models/user";
import Chat from "../models/chat";
import { authenticate, authorize } from "../middleware/auth";

const router = Router();

// Anyone authenticated can check counts
router.get("/counts", authenticate, async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalChats = await Chat.countDocuments();
  res.json({ totalUsers, totalChats });
});

// Admin-only example
router.get(
  "/admin/all",
  authenticate,
  authorize(["admin"]),
  async (req, res) => {
    const users = await User.find().select("-password");
    const chats = await Chat.find().limit(100).sort({ createdAt: -1 });
    res.json({ users, chats });
  }
);

export default router;
