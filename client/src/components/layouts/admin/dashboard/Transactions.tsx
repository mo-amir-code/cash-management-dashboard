import type { TransactionType } from "../../../../types/components/layouts/admin/dashboard";
import { formatIndianNumber, formatToDayMonYear } from "../../../../utils";

const Transactions = ({ data }: { data: TransactionType[] }) => {
  return (
    <div className="max-h-[60vh] p-4 bg-white rounded-lg overflow-auto no-scrollbar">
      {data?.length ? (
        <table className="w-full table-fixed">
          <thead className="text-foreground-black/60 rounded-lg font-medium">
            <tr>
              <th className="border-b-2 border-b-foreground-black/40">
                Location
              </th>
              <th className="border-b-2 border-b-foreground-black/40">
                Emp.ID
              </th>
              <th className="border-b-2 border-b-foreground-black/40">
                Emp.Name
              </th>
              <th className="border-b-2 border-b-foreground-black/40">
                Collection(MM)
              </th>
              <th className="border-b-2 border-b-foreground-black/40">Date</th>
              <th className="border-b-2 border-b-foreground-black/40">
                Cash Deposit
              </th>
              <th className="border-b-2 border-b-foreground-black/40">
                Deposit Date
              </th>
              <th className="border-b-2 border-b-foreground-black/40">
                Difference
              </th>
            </tr>
          </thead>
          <tbody className=" text-foreground-black">
            {data.map((cn, idx) => (
              <tr key={idx}>
                {/* Location */}
                <td className="text-center border-b border-b-foreground-black/10 break-all">
                  {cn.location}
                </td>
                {/* EMP ID */}
                <td className="text-center border-b border-b-foreground-black/10">
                  {cn.emp.id.slice(-5)}
                </td>
                {/* Emp Name */}
                <td className="text-center border-b border-b-foreground-black/10">
                  {cn.emp.name}
                </td>
                {/* Collection Amount */}
                <td className="text-center border-b border-b-foreground-black/10">
                  {cn?.collection
                    ? formatIndianNumber(cn?.collection?.amount)
                    : ""}
                </td>
                {/* Collection Date */}
                <td className="text-center border-b border-b-foreground-black/10">
                  {cn?.collection
                    ? formatToDayMonYear(cn.collection.date as string)
                    : ""}
                </td>
                {/* Deposit Amount */}
                <td className="text-center border-b border-b-foreground-black/10">
                  {cn?.deposit ? formatIndianNumber(cn?.deposit?.amount) : ""}
                </td>
                {/* Deposit Date */}
                <td className="text-center border-b border-b-foreground-black/10">
                  {cn?.deposit
                    ? formatToDayMonYear(cn.deposit.date as string)
                    : ""}
                </td>
                {/* Difference */}
                <td
                  className={`text-center border-b border-b-foreground-black/10 font-semibold ${
                    cn.difference < 0 ? "text-red-500" : "text-green-600"
                  }`}
                >
                  {/* ({cn.difference < 0 ? "-" : "+"}) */}
                  {formatIndianNumber(cn?.difference || 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <span className="text-center w-full max-md:text-sm">
          0 Transactions
        </span>
      )}
    </div>
  );
};

export default Transactions;
