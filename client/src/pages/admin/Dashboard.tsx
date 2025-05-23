import {
  Modal,
    Pagination,
  ReportCard,
  Transactions,
} from "../../components/layouts/admin/dashboard";
import type { TransactionType } from "../../types/components/layouts/admin/dashboard";
import { txnData } from "../../utils/data";

const Dashboard = () => {
  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex items-center gap-4">
        <ReportCard
          heading="Total Collection (MM)"
          subline="(All Locations)"
          amount={87000}
          type="collection"
        />
        <ReportCard
          heading="Total Deposit Amount"
          subline="(All Locations)"
          amount={87000}
          type="deposit"
        />
        <ReportCard
          heading="Difference Amount"
          subline="(All Locations)"
          amount={87000}
          type="difference"
        />

        <div className="flex-1 flex items-center justify-end">
            <Modal />
        </div>
      </div>

      <Transactions data={txnData as TransactionType[]} />
      <Pagination />
    </div>
  );
};

export default Dashboard;
