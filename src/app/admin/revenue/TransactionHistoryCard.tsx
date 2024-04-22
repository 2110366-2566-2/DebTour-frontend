import { Label } from "@/components/ui/label";
import { format, parseISO } from "date-fns";
import { AgencyTransactionType } from "./type";

const TransactionHistoryCard = ({
  agencyRevenue,
}: {
  agencyRevenue: AgencyTransactionType;
}) => {
  const {
    amount,
    method,
    status,
    stripeID,
    timestamp,
    tourId,
    touristUsername,
    transactionId,
  } = agencyRevenue;

  return (
    <div className="mb-8 grid rounded-xl border border-gray-200 px-4 py-4 duration-100 hover:bg-gray-100">
      <div className="grid grid-cols-10 items-center gap-4">
        <Label htmlFor="amount" className="col-span-3 text-right">
          Amount
        </Label>
        <p id="amount">{amount || "-"}</p>
      </div>
      <div className="grid grid-cols-10 items-center gap-4">
        <Label htmlFor="method" className="col-span-3 text-right">
          Payment method
        </Label>
        <p id="method">{method || "-"}</p>
      </div>
      <div className="grid grid-cols-10 items-center gap-4">
        <Label htmlFor="status" className="col-span-3  text-right">
          Status
        </Label>
        <p id="status">{status || "-"}</p>
      </div>
      <div className="grid grid-cols-10 items-center gap-4">
        <Label htmlFor="stripeID" className="col-span-3 text-right">
          Stripe ID
        </Label>
        <p id="stripeID">{stripeID || "-"}</p>
      </div>
      <div className="grid grid-cols-10 items-center gap-4">
        <Label htmlFor="timestamp" className="col-span-3 text-right">
          Timestamp
        </Label>
        <p id="timestamp">
          {timestamp ? format(parseISO(timestamp), "yyyy-MM-dd HH:mm:ss") : "-"}
        </p>
      </div>
      <div className="grid grid-cols-10 items-center gap-4">
        <Label htmlFor="tourId" className="col-span-3 text-right">
          Tour ID
        </Label>
        <p id="tourId">{tourId || "-"}</p>
      </div>
      <div className="grid grid-cols-10 items-center gap-4">
        <Label htmlFor="touristUsername" className="col-span-3 text-right">
          Tourist Username
        </Label>
        <p id="touristUsername">{touristUsername || "-"}</p>
      </div>
      <div className="grid grid-cols-10 items-center gap-4">
        <Label htmlFor="transactionId" className="col-span-3 text-right">
          Transaction ID
        </Label>
        <p id="transactionId">{transactionId || "-"}</p>
      </div>
    </div>
  );
};

export default TransactionHistoryCard;
