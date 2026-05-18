import { sign } from "jsonwebtoken";
import crypto from "crypto";
import { User } from "../models/User";
import { ApiError } from "../utils/ApiError";
import { comparePassword, hashPassword } from "../utils/password";
import { env } from "../config/env";
import type { UserRole } from "../constants";

const ADMIN_EMAIL = env.adminEmail;

const signToken = (userId: string, role: UserRole) => {
  return sign({ userId, role }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn
  });
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const normalizedEmail = email.toLowerCase();
  const existing = await User.findOne({ email: normalizedEmail });
  if (existing) {
    throw new ApiError("Email already registered", 409);
  }

  const role: UserRole =
    normalizedEmail === ADMIN_EMAIL ? "admin" : "sales";

  const hashed = await hashPassword(password);
  const user = await User.create({
    name,
    email: normalizedEmail,
    password: hashed,
    role
  });
  const token = signToken(user.id, user.role);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    token
  };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError("Invalid credentials", 401);
  }

  const valid = await comparePassword(password, user.password);
  if (!valid) {
    throw new ApiError("Invalid credentials", 401);
  }

  const token = signToken(user.id, user.role);
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    token
  };
};

export const forgotPassword = async (email: string) => {
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    // Don't reveal whether email exists
    return { message: "If this email is registered, a reset link has been sent." };
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  user.resetToken = resetToken;
  user.resetTokenExpiry = resetTokenExpiry;
  await user.save();

  // In production, send email with reset link containing the token
  // For demo, we return the token in the response
  return {
    message: "If this email is registered, a reset link has been sent.",
    resetToken // Remove in production — only for demo/testing
  };
};

export const resetPassword = async (token: string, newPassword: string) => {
  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: new Date() }
  });

  if (!user) {
    throw new ApiError("Invalid or expired reset token", 400);
  }

  user.password = await hashPassword(newPassword);
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  return { message: "Password reset successfully" };
};
