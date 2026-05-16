import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { apiResponse } from "../utils/apiResponse";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ApiError) {
    res
      .status(err.statusCode)
      .json(apiResponse(false, err.message, err.details));
    return;
  }

  res.status(500).json(apiResponse(false, "Server error"));
};
