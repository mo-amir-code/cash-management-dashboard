import type { GetAllTransactionType } from "../types/apis/transaction";
import type { FormRowType } from "../types/components/layouts/admin/dashboard";
import { httpAxios } from "../utils/axios";

const handleToGetAllTransactions = async ({
  queryKey,
}: {
  queryKey: [string, GetAllTransactionType];
}) => {
  const [_key, { page, itemPerPage }] = queryKey;

  const res = await httpAxios.get(
    `/transaction?page=${page}&item=${itemPerPage}`
  );
  return res.data;
};

const handleToGetAllTransactionsAccountData = async () => {
  const res = await httpAxios.get("/transaction/account");
  return res.data;
};

const handleToPostTransactions = async (data: FormRowType[]) => {
  const res = await httpAxios.post("/transaction", data);
  return res.data;
};

export {
  handleToGetAllTransactions,
  handleToGetAllTransactionsAccountData,
  handleToPostTransactions,
};


// Employee
const handleToGetAllTransactionsForEmp = async ({
  queryKey,
}: {
  queryKey: [string, GetAllTransactionType];
}) => {
  const [_key, { page, itemPerPage, accountId }] = queryKey;

  const res = await httpAxios.get(
    `/transaction?page=${page}&item=${itemPerPage}${
      accountId ? "&accountId=" + accountId : ""
    }`
  );
  return res.data;
};

const handleToGetAllTransactionsAccountDataForEmp = async ({
  queryKey,
}: {
  queryKey: [string, { accountId?: string | undefined }];
}) => {
  const [_key, { accountId }] = queryKey;

  const res = await httpAxios.get(
    `/transaction/account?${accountId ? "accountId=" + accountId : ""}`
  );
  return res.data;
};


export {
  handleToGetAllTransactionsAccountDataForEmp,
  handleToGetAllTransactionsForEmp
}
