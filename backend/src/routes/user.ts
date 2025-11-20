import { Router } from "express";
import {
  getMe,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { authenticate, authorize } from "../middleware/auth";

const router = Router();

// Get current user
router.get("/me", authenticate, getMe);

// Admin: list users
router.get("/", authenticate, authorize(["admin"]), getUsers);

// Update any user (admin or self)
router.put("/:id", authenticate, authorize(["admin"]), updateUser);

// Delete user (admin)
router.delete("/:id", authenticate, authorize(["admin"]), deleteUser);

export default router;
