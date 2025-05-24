import z from "zod";
import { ZOD_REQUIRED_ERR } from "../../utils/constants/auth";
import { TRANSACTION_ROLE } from "../../config/schemas";

const createTransactionZodSchema = z.object({
  body: z.array(
    z.object({
      accountId: z.string({
        required_error: ZOD_REQUIRED_ERR.replace("{field}", "Account ID"),
      }),
      amount: z.number({
        required_error: ZOD_REQUIRED_ERR.replace("{field}", "Amount"),
      }),
      location: z.string({
        required_error: ZOD_REQUIRED_ERR.replace("{field}", "Location"),
      }),
      type: z.enum(TRANSACTION_ROLE, {
        required_error: ZOD_REQUIRED_ERR.replace("{field}", "Type"),
      }),
      date: z.string({
        required_error: ZOD_REQUIRED_ERR.replace("{field}", "Date"),
      }),
    })
  ),
});

const getTransactionsZodSchema = z.object({
  // param: z.object({
  //   accountId: z.string().optional(),
  // }),
  query: z.object({
    page: z.string({
      required_error: ZOD_REQUIRED_ERR.replace("{field}", "Page"),
    }),
    item: z.string({
      required_error: ZOD_REQUIRED_ERR.replace("{field}", "Item"),
    }),
    accountId: z.string().optional(),
  }),
});

const getTransactionsAccountZodSchema = z.object({
  query: z.object({
    accountId: z.string().optional(),
  }),
});

export {
  createTransactionZodSchema,
  getTransactionsZodSchema,
  getTransactionsAccountZodSchema,
};
