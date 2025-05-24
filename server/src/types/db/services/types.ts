import { Schema } from "mongoose";
import {
  TransactionSchemaType,
  TransactionType,
  UserRoleType,
} from "../schemas";

// User's Schema
interface RegisterUserType {
  name?: string;
  email: string;
  password: string;
  role?: UserRoleType;
}

interface FindByIdAndUpdateUserType {
  id: Schema.Types.ObjectId;
  name?: string;
  password?: string;
  isVerified?: string;
  session?: string;
  otp?: string | undefined;
  otpToken?: string | undefined;
}

export type { RegisterUserType, FindByIdAndUpdateUserType };

// Account's Schema
interface CreateAccountType {
  userId: Schema.Types.ObjectId | string;
  totalCollection?: number;
  totalDeposit?: number;
}

interface FindByIdAndUpdateAccountType {
  id: Schema.Types.ObjectId | string;
  totalCollection?: number;
  totalDeposit?: number;
}

export type { CreateAccountType, FindByIdAndUpdateAccountType };

// Transaction's Schema
interface CreateTransactionType {
  accountId: Schema.Types.ObjectId | string;
  amount: number;
  location: string;
  type: TransactionType;
  date: Date;
}

interface UpdateTransactionType {
  id: Schema.Types.ObjectId | string;
  amount?: number;
  type?: TransactionType;
  location?: string;
  date?: Date;
}

interface GetAllTransactionType {
  page: number;
  item: number;
  accountId?: string | null
}

interface TransactionResponseType extends TransactionSchemaType {
  emp: {
    id: string;
    name: string;
  };
}

interface GetAllTransactionResponseType {
  transactions: TransactionResponseType[];
  totalPages: number;
}

export type {
  CreateTransactionType,
  UpdateTransactionType,
  GetAllTransactionType,
  GetAllTransactionResponseType,
};
