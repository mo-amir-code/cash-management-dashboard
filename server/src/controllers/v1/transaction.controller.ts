import {
  createManyTransactions,
  getAllTransactions,
  getFilteredTransactions,
} from "../../db/services/transaction.service";
import { apiHandler, ok } from "../../services/errorHandling";
import { TransactionSchemaType } from "../../types/db/schemas";
import {
  ALL_TRANSACTIONS_ACCOUNT_DATA_FECTHED_MSG,
  ALL_TRANSACTIONS_FECTHED_MSG,
  TRANSACTIONS_CREATED_MSG,
} from "../../utils/constants/serverResponseMessages";

const createTransactions = apiHandler(async (req, res, next) => {
  const txns = req.body;
  await createManyTransactions(txns);
  return ok({
    res,
    message: TRANSACTIONS_CREATED_MSG,
  });
});

const getTransactions = apiHandler(async (req, res, next) => {
  const page = parseInt(req.query.page as string) || 1;
  const item = parseInt(req.query.item as string) || 10;
  const accountId = req.query.accountId as string;

  let txns = await getFilteredTransactions({
    page,
    item,
    accountId: accountId ?? null,
  });

  return ok({
    res,
    message: ALL_TRANSACTIONS_FECTHED_MSG,
    data: txns,
  });
});

const getTotalTransactionAccountData = apiHandler(async (req, res, next) => {
  const accountId = req.query?.accountId as string | undefined;
  const txns = JSON.parse(
    JSON.stringify(
      await getAllTransactions({ accountId: accountId ?? undefined })
    )
  );

  const totalCollection = txns.reduce(
    (total: number, current: TransactionSchemaType) => {
      if (current.type === "collection") return total + current.amount;
      return total;
    },
    0
  );

  const totalDeposit = txns.reduce(
    (total: number, current: TransactionSchemaType) => {
      if (current.type === "deposit") return total + current.amount;
      return total;
    },
    0
  );

  return ok({
    res,
    message: ALL_TRANSACTIONS_ACCOUNT_DATA_FECTHED_MSG,
    data: {
      totalCollection,
      totalDeposit,
    },
  });
});

export { getTransactions, createTransactions, getTotalTransactionAccountData };
