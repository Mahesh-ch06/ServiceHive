import mongoose, { Schema, type Document } from "mongoose";
import type { UserRole } from "../constants";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  resetToken?: string;
  resetTokenExpiry?: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "sales"], default: "sales" },
    resetToken: { type: String, default: undefined },
    resetTokenExpiry: { type: Date, default: undefined }
  },
  { timestamps: true }
);

export const User = mongoose.model<UserDocument>("User", userSchema);
