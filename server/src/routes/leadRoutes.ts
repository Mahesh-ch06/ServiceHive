import { Router } from "express";
import {
  create,
  exportCsv,
  getById,
  list,
  remove,
  stats,
  update
} from "../controllers/leadController";
import { authenticate } from "../middleware/auth";
import { authorize } from "../middleware/authorize";
import { validateRequest } from "../middleware/validateRequest";
import {
  leadParamsSchema,
  leadQuerySchema
} from "../validations/leadQueryValidation";
import { createLeadSchema, updateLeadSchema } from "../validations/leadValidation";

const router = Router();

router.use(authenticate);

router.get("/stats", stats);
router.get("/export", validateRequest({ query: leadQuerySchema }), exportCsv);
router.get("/", validateRequest({ query: leadQuerySchema }), list);
router.get("/:id", validateRequest({ params: leadParamsSchema }), getById);
router.post("/", validateRequest({ body: createLeadSchema }), create);
router.patch(
  "/:id",
  validateRequest({ params: leadParamsSchema, body: updateLeadSchema }),
  update
);
router.delete(
  "/:id",
  authorize("admin"),
  validateRequest({ params: leadParamsSchema }),
  remove
);

export default router;
