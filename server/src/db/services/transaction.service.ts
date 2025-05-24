import { Schema } from "mongoose";
import { Transaction, User } from "../schemas";
import { TransactionSchemaType } from "../../types/db/schemas";
import {
  CreateTransactionType,
  GetAllTransactionResponseType,
  GetAllTransactionType,
  UpdateTransactionType,
} from "../../types/db/services/types";
import { getAccountById } from "./account.db.service";
import { SOMETHING_WENT_WRONG } from "../../utils/constants/serverResponseMessages";

const createManyTransactions = async (
  data: CreateTransactionType[]
): Promise<TransactionSchemaType[]> => {
  const updatedData = await Promise.all(
    data.map(async (t) => {
      const account = await getAccountById(t.accountId);

      if (!account) {
        throw new Error(SOMETHING_WENT_WRONG);
      }

      if (t.type === "collection") {
        account.totalCollection += t.amount;
      } else {
        account.totalDeposit += t.amount;
      }

      await account.save();

      return {
        ...t,
        difference: account.totalDeposit - account.totalCollection,
      };
    })
  );

  const res = await Transaction.insertMany(updatedData);

  return res;
};

const deleteTransactionById = async (
  txnId: Schema.Types.ObjectId
): Promise<TransactionSchemaType | null> => {
  return await Transaction.findByIdAndDelete(txnId);
};

const findTransactionByIdAndUpdate = async (
  data: UpdateTransactionType
): Promise<TransactionSchemaType | null> => {
  return await Transaction.findByIdAndUpdate(
    data.id,
    { ...data },
    { new: true }
  );
};

const getTransactionsByAccountId = async (
  accountId: Schema.Types.ObjectId | string
): Promise<TransactionSchemaType[]> => {
  return await Transaction.find({ accountId }).sort({ date: -1 }); // latest first
};

const getTransactionsById = async (
  id: Schema.Types.ObjectId
): Promise<TransactionSchemaType[]> => {
  return await Transaction.findById(id).sort({ date: -1 }); // latest first
};

const getFilteredTransactions = async ({
  page,
  item,
  accountId,
}: GetAllTransactionType): Promise<GetAllTransactionResponseType> => {
  const skip = (page - 1) * item;

  let query: any = {};

  if (accountId) {
    query["accountId"] = accountId;
  }

  let txns = await Transaction.find(query)
    .skip(skip)
    .limit(item)
    .select("-createdAt -updatedAt -__v")
    .populate("accountId")
    .sort({ createdAt: -1 }); // latest first

  const empIds = Array.from(new Set(txns.map((t: any) => t.accountId.userId)));
  let emps = await User.find({ _id: { $in: empIds } });

  emps = JSON.parse(JSON.stringify(emps));
  txns = JSON.parse(JSON.stringify(txns));

  txns = txns.map((t) => {
    const currentEmp = emps.find((e) => e._id === t.accountId.userId);
    const txn = JSON.parse(JSON.stringify(t));

    const obj = {
      ...txn,
      id: txn._id,
      accountId: txn.accountId._id,
      [txn.type]: {
        amount: txn.amount,
        date: txn.date,
      },
      emp: {
        id: currentEmp._id,
        name: currentEmp.name,
      },
    };

    delete obj._id;
    delete obj.amount;
    delete obj.date;

    return obj;
  });

  const total = await Transaction.countDocuments();

  return {
    transactions: txns,
    totalPages: Math.ceil(total / item),
  };
};

const getAllTransactions = async ({
  accountId,
}: {
  accountId?: string | undefined;
}) => {
  let query: any = {};
  if (accountId) {
    query["accountId"] = accountId;
  }
  return await Transaction.find(query).sort({ createdAt: -1 });
};

export {
  createManyTransactions,
  deleteTransactionById,
  findTransactionByIdAndUpdate,
  getTransactionsByAccountId,
  getTransactionsById,
  getFilteredTransactions,
  getAllTransactions,
};
