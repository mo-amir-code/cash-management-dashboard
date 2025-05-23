import { Schema } from "mongoose";
import { UserRoleType } from "../schemas";

// User's Schema
interface RegisterUserType {
  email: string;
  password: string;
  role?: UserRoleType;
}

interface FindByIdAndUpdateUserType {
  id: Schema.Types.ObjectId;
  password?: string;
  isVerified?: string;
  session?: string;
  otp?: string | undefined;
  otpToken?: string | undefined;
}

export type { RegisterUserType, FindByIdAndUpdateUserType };
