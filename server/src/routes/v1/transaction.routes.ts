import express from "express";
import { zodValidation } from "../../services/zod";
import {
  createTransactions,
  getTotalTransactionAccountData,
  getTransactions,
} from "../../controllers/v1/transaction.controller";
import {
  createTransactionZodSchema,
  getTransactionsAccountZodSchema,
  getTransactionsZodSchema,
} from "../../services/zod/transaction";
const router = express.Router();

router.get("/", zodValidation(getTransactionsZodSchema), getTransactions);
router.get(
  "/account",
  zodValidation(getTransactionsAccountZodSchema),
  getTotalTransactionAccountData
);
router.post("/", zodValidation(createTransactionZodSchema), createTransactions);

export default router;
