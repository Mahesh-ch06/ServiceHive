import { Router } from "express";
import { login, register, forgot, reset } from "../controllers/authController";
import { validateRequest } from "../middleware/validateRequest";
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema
} from "../validations/authValidation";

const router = Router();

router.post("/register", validateRequest({ body: registerSchema }), register);
router.post("/login", validateRequest({ body: loginSchema }), login);
router.post("/forgot-password", validateRequest({ body: forgotPasswordSchema }), forgot);
router.post("/reset-password", validateRequest({ body: resetPasswordSchema }), reset);

export default router;
