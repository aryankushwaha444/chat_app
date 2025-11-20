import { Request, Response } from "express";
import User from "../models/user";
import { AuthRequest } from "../middleware/auth";
import bcrypt from "bcrypt";

export const getMe = async (req: AuthRequest, res: Response) => {
  const id = req.user?.id;
  const user = await User.findById(id).select("-password");
  res.json(user);
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find().select("-password");
  res.json(users);
};

export const updateUser = async (req: AuthRequest, res: Response) => {
  const id = req.params.id;
  const updates = req.body;
  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }
  const user = await User.findByIdAndUpdate(id, updates, { new: true }).select(
    "-password"
  );
  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  await User.findByIdAndDelete(id);
  res.json({ message: "User deleted" });
};
