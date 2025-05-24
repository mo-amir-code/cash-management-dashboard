import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  Pagination,
  ReportCard,
  Transactions,
} from "../../components/layouts/admin/dashboard";
import type { TransactionType } from "../../types/components/layouts/admin/dashboard";
import {
  handleToGetAllTransactionsAccountDataForEmp,
  handleToGetAllTransactionsForEmp,
} from "../../apis/transactions";
import { useEffect, useState } from "react";
import { useUserDispatch, useUserState } from "../../context/GlobalContext";

const Employee = () => {
  const [page, setPage] = useState<number>(1);
  const [itemPerPage, setItemPerPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [totalCollection, setTotalCollection] = useState<number>(0);
  const [totalDeposit, setTotalDeposit] = useState<number>(0);
  const [transactionsData, setTransactionsData] = useState<TransactionType[]>(
    []
  );
  const dispatch = useUserDispatch();
  const { emps } = useUserState();
  const [selectedEmpAccountId, setSelectedEmpAccountId] = useState<
    string | null
  >(emps[0]?.accountId || null);

  const { isLoading, data, isPlaceholderData } = useQuery({
    queryKey: [
      `emp-transactions-${selectedEmpAccountId ?? ""}`,
      { page, itemPerPage, accountId: selectedEmpAccountId ?? undefined },
    ],
    queryFn: handleToGetAllTransactionsForEmp,
    placeholderData: keepPreviousData,
  });
  const { isLoading: accountLoading, data: accountData } = useQuery({
    queryKey: [
      `emp-transactions-account-${selectedEmpAccountId ?? ""}`,
      { accountId: selectedEmpAccountId ?? undefined },
    ],
    queryFn: handleToGetAllTransactionsAccountDataForEmp,
  });

  useEffect(() => {
    if (accountLoading) return;
    setTotalCollection(accountData.data.totalCollection);
    setTotalDeposit(accountData.data.totalDeposit);
  }, [accountLoading, accountData]);

  useEffect(() => {
    if (isLoading) return;
    setTotalPage(data.data.totalPages);
    setTransactionsData(data.data.transactions);
  }, [isLoading, data, isPlaceholderData]);

  useEffect(() => {
    if (isLoading || accountLoading) {
      dispatch({
        type: "IS_LOADING",
        payload: true,
      });
    } else {
      dispatch({
        type: "IS_LOADING",
        payload: false,
      });
    }
  }, [isLoading, accountLoading]);



  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex items-center gap-4">
        <ReportCard
          heading="Total Collection (MM)"
          subline="(All Locations)"
          amount={totalCollection}
          type="collection"
        />
        <ReportCard
          heading="Total Deposit Amount"
          subline="(All Locations)"
          amount={totalDeposit}
          type="deposit"
        />
        <ReportCard
          heading="Difference Amount"
          subline="(All Locations)"
          amount={totalDeposit - totalCollection}
          type="difference"
        />

        <div className="flex-1 flex text-foreground-black items-center justify-end">
          <div className="max-w-md">
            <select
              onChange={(e) => {
                setSelectedEmpAccountId(e.target.value);
                // e.target.value = ""; // Reset dropdown
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value={emps[0]?.accountId}>{emps[0]?.name}</option>
              {emps?.slice(1).map((employee) => (
                <option key={employee.id} value={employee.accountId}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <Transactions data={transactionsData as TransactionType[]} />
      <Pagination
        onRowsPerPageChange={setItemPerPage}
        onPageChange={setPage}
        currentPage={page}
        totalPages={totalPage}
        rowsPerPage={itemPerPage}
      />
    </div>
  );
};

export default Employee;
