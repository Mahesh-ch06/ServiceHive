import { asyncHandler } from "../utils/asyncHandler";
import { apiResponse } from "../utils/apiResponse";
import { loginUser, registerUser } from "../services/authService";

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
