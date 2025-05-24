import mongoose, { Schema } from "mongoose";
import {
  ACCOUNT_SCHEMA_NAME,
  TRANSACTION_ROLE,
  TRANSACTION_SCHEMA_NAME,
} from "../../config/schemas";
import { TransactionSchemaType } from "../../types/db/schemas";

const txnSchema: Schema<TransactionSchemaType> =
  new Schema<TransactionSchemaType>(
    {
      accountId: {
        type: Schema.Types.ObjectId,
        required: [true, "Account ID is required"],
        ref: ACCOUNT_SCHEMA_NAME,
      },
      amount: { type: Number, required: [true, "Amount is required"] },
      location: { type: String, required: [true, "Location is required"] },
      difference: { type: Number, required: [true, "Location is required"] },
      type: {
        type: String,
        enum: TRANSACTION_ROLE,
        required: [true, "Txn type is required"],
      },
      date: { type: Date, required: [true, "Date is required"] },
    },
    { timestamps: true }
  );

export default mongoose.models[TRANSACTION_SCHEMA_NAME] ||
  mongoose.model<TransactionSchemaType>(TRANSACTION_SCHEMA_NAME, txnSchema);
