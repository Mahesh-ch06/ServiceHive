import { sign } from "jsonwebtoken";
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
