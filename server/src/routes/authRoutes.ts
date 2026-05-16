import { Router } from "express";
import { login, register } from "../controllers/authController";
import { validateRequest } from "../middleware/validateRequest";
import { loginSchema, registerSchema } from "../validations/authValidation";

const router = Router();

router.post("/register", validateRequest({ body: registerSchema }), register);
router.post("/login", validateRequest({ body: loginSchema }), login);

export default router;
