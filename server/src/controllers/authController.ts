import { asyncHandler } from "../utils/asyncHandler";
import { apiResponse } from "../utils/apiResponse";
import {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword
} from "../services/authService";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const result = await registerUser(name, email, password);
  res.status(201).json(apiResponse(true, "User registered", result));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await loginUser(email, password);
  res.status(200).json(apiResponse(true, "Login successful", result));
});

export const forgot = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const result = await forgotPassword(email);
  res.status(200).json(apiResponse(true, result.message, result));
});

export const reset = asyncHandler(async (req, res) => {
  const { token, password } = req.body;
  const result = await resetPassword(token, password);
  res.status(200).json(apiResponse(true, result.message));
});
