import type { TransactionType } from "../../../../types/components/layouts/admin/dashboard";
import { formatIndianNumber } from "../../../../utils";

const Transactions = ({ data }: { data: TransactionType[] }) => {
  return (
    <div className="max-h-[60%] p-4 bg-white rounded-lg overflow-auto no-scrollbar">
      <table className="w-full table-fixed">
        {data?.length ? (
          <>
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
                <th className="border-b-2 border-b-foreground-black/40">
                  Date
                </th>
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
                  <td className="text-center border-b border-b-foreground-black/10 break-all">
                    {cn.location}
                  </td>
                  <td className="text-center border-b border-b-foreground-black/10">
                    {cn.id}
                  </td>
                  <td className="text-center border-b border-b-foreground-black/10">
                    {formatIndianNumber(cn?.collection?.amount) || ""}
                  </td>
                  <td className="text-center border-b border-b-foreground-black/10">
                    {formatIndianNumber(cn?.name) || ""}
                  </td>
                  <td className="text-center border-b border-b-foreground-black/10">
                    {cn?.collection?.date
                      ? new Date(cn?.collection?.date).getUTCDate()
                      : ""}
                  </td>
                  <td className="text-center border-b border-b-foreground-black/10">
                    {cn?.deposit?.amount
                      ? formatIndianNumber(cn?.deposit?.amount)
                      : ""}
                  </td>
                  <td className="text-center border-b border-b-foreground-black/10">
                    {cn?.deposit?.date
                      ? new Date(cn?.deposit?.date).getUTCDate()
                      : ""}
                  </td>
                  <td
                    className={`text-center border-b border-b-foreground-black/10 font-semibold ${
                      cn.difference < 0 ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    ({cn.difference < 0 ? "-" : "+"})
                    {formatIndianNumber(cn.difference)}
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        ) : (
          <p className="text-center w-full max-md:text-sm">0 Transactions</p>
        )}
      </table>
    </div>
  );
};

export default Transactions;
