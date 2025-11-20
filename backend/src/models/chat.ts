import mongoose, { Schema, Document } from "mongoose";

export interface IChat extends Document {
  userId: mongoose.Types.ObjectId;
  username: string;
  message: string;
  createdAt: Date;
}

const ChatSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IChat>("Chat", ChatSchema);
