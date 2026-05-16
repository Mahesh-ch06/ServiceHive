import type { NextFunction, Request, Response } from "express";
import type { UserRole } from "../constants";
import { ApiError } from "../utils/ApiError";

export const authorize = (...roles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new ApiError("Unauthorized", 401);
    }

    if (!roles.includes(req.user.role)) {
      throw new ApiError("Forbidden", 403);
    }

    next();
  };
};
