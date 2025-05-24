import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  Modal,
  Pagination,
  ReportCard,
  Transactions,
} from "../../components/layouts/admin/dashboard";
import type { TransactionType } from "../../types/components/layouts/admin/dashboard";
import {
  handleToGetAllTransactions,
  handleToGetAllTransactionsAccountData,
} from "../../apis/transactions";
import { useEffect, useState } from "react";
import { handleToGetAllEmployees } from "../../apis/user";
import { useUserDispatch } from "../../context/GlobalContext";

const Dashboard = () => {
  const [page, setPage] = useState<number>(1);
  const [itemPerPage, setItemPerPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [totalCollection, setTotalCollection] = useState<number>(0);
  const [totalDeposit, setTotalDeposit] = useState<number>(0);
  const [transactionsData, setTransactionsData] = useState<TransactionType[]>(
    []
  );
  const dispatch = useUserDispatch();

  const { isLoading, data, isPlaceholderData } = useQuery({
    queryKey: ["transactions", { page, itemPerPage }],
    queryFn: handleToGetAllTransactions,
    placeholderData: keepPreviousData,
  });
  const { isLoading: accountLoading, data: accountData } = useQuery({
    queryKey: ["transactions-account"],
    queryFn: handleToGetAllTransactionsAccountData,
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

  const { isLoading: usersLoading, data: usersData } = useQuery({
    queryKey: ["users-emps"],
    queryFn: handleToGetAllEmployees,
  });

  useEffect(() => {
    if (usersLoading) return;
    dispatch({
      type: "EMPLOYEES",
      payload: usersData.data,
    });
  }, [usersLoading, usersData]);

  useEffect(() => {
    if (isLoading || accountLoading || usersLoading) {
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
  }, [isLoading, accountLoading, usersLoading]);

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

        <div className="flex-1 flex items-center justify-end">
          <Modal />
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

export default Dashboard;
