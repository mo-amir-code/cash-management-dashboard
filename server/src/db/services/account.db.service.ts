import { Schema } from "mongoose";
import { Account } from "../schemas";
import { AccountSchemaType } from "../../types/db/schemas";
import { CreateAccountType, FindByIdAndUpdateAccountType } from "../../types/db/services/types";

const createAccount = async (
  data: CreateAccountType
): Promise<AccountSchemaType> => {
  return await Account.create(data);
};

const deleteAccountById = async (
  accountId: Schema.Types.ObjectId
): Promise<AccountSchemaType | null> => {
  return await Account.findByIdAndDelete(accountId);
};

const findAccountByIdAndUpdate = async (
  data: FindByIdAndUpdateAccountType
): Promise<AccountSchemaType | null> => {
  return await Account.findByIdAndUpdate(data.id, { ...data }, { new: true });
};

const getAccountByUserId = async (
  userId: Schema.Types.ObjectId | string
): Promise<AccountSchemaType | null> => {
  return await Account.findOne({ userId });
};

const getAccountById = async (
  id: Schema.Types.ObjectId | string
): Promise<AccountSchemaType | null> => {
  return await Account.findById(id);
};

export {
  createAccount,
  deleteAccountById,
  findAccountByIdAndUpdate,
  getAccountByUserId,
  getAccountById
};
