import type { Request, Response } from "express";
import { apiResponse } from "../utils/apiResponse";

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json(apiResponse(false, `Route ${req.originalUrl} not found`));
};
