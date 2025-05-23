import mongoose, { Schema } from "mongoose";
import { ACCOUNT_SCHEMA_NAME, USER_SCHEMA_NAME } from "../../config/schemas";
import { AccountSchemaType } from "../../types/db/schemas";

const accountSchema: Schema<AccountSchemaType> = new Schema<AccountSchemaType>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "User ID is required"],
      ref: USER_SCHEMA_NAME,
    },
    totalCollection: { type: Number, default: 0 },
    totalDeposit: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models[ACCOUNT_SCHEMA_NAME] ||
  mongoose.model<AccountSchemaType>(ACCOUNT_SCHEMA_NAME, accountSchema);
