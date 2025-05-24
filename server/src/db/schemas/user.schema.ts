import mongoose, { Schema } from "mongoose";
import { USER_SCHEMA_NAME, USERS_ROLE } from "../../config/schemas";
import { UserSchemaType } from "../../types/db/schemas";

const userSchema: Schema<UserSchemaType> = new Schema<UserSchemaType>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    role: {
      type: String,
      default: "employee",
      enum: USERS_ROLE,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    session: { type: String },
    otp: { type: String },
    otpToken: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models[USER_SCHEMA_NAME] ||
  mongoose.model<UserSchemaType>(USER_SCHEMA_NAME, userSchema);
