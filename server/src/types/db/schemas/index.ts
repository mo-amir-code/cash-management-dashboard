import { Document, Schema, Types } from "mongoose";

interface MongoDBSchemaDefaultFieldType extends Document {
  _id: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRoleType = "employee" | "admin";
export type TransactionType = "collection" | "deposit";

interface UserSchemaType extends MongoDBSchemaDefaultFieldType {
  email: string;
  role: UserRoleType;
  password: string;
  isVerified?: boolean;
  session?: string;
  otp?: string;
  otpToken?: string;
}

interface AccountSchemaType extends MongoDBSchemaDefaultFieldType {
  userId: Types.ObjectId;
  totalCollection: number
  totalDeposit: number
}

interface TransactionSchemaType extends MongoDBSchemaDefaultFieldType {
  accountId: Types.ObjectId;
  type: TransactionType
  amount: number
  date: Date
}

export type {
    UserSchemaType,
    TransactionSchemaType,
    AccountSchemaType
}