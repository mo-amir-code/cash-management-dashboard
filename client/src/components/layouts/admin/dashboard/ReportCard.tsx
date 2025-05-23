import type { ReportCardType } from "../../../../types/components/layouts/admin/dashboard";
import { formatIndianNumber } from "../../../../utils";

const ReportCard = ({ heading, subline, amount, type }: ReportCardType) => {
  return (
    <div className="p-4 text-foreground-black gap-4 flex items-center bg-white max-w-sm w-fit rounded-lg">
      <div className="w-16 aspect-square rounded-full bg-background"></div>

      <div className="font-semibold space-y-1">
        <div>
          <h3 className="opacity-60 text-sm">{heading}</h3>
          {!!subline && <p className="opacity-60">{subline}</p>}
        </div>
        <span
          className={`text-lg ${
            amount < 0
              ? "text-red-500"
              : (type === "deposit" || (amount > 0 && type === "difference"))
              ? "text-green-500"
              : ""
          }`}
        >
          ₹{formatIndianNumber(amount)}
        </span>
      </div>
    </div>
  );
};

export default ReportCard;
