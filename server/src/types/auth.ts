import type { UserRole } from "../constants";

export interface AuthPayload {
  userId: string;
  role: UserRole;
}
