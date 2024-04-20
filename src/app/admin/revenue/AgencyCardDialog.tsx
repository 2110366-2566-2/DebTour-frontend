import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { dummyOneAgency } from "./dummyAgencyData";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

const AgencyCardDialog = () => {
  const { data: session } = useSession();

  async function getAgencyRevenue() {
    const token = session?.user?.serverToken;
    const username = session?.user?.id;
    const backendUrl = process.env.BACKEND_URL;

    const res = await axios.get(
      `${backendUrl}/api/v1/agencies/getRevenue/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data.amount;
  }

  const {
    data: agencyRevenue,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getAgencyRevenue(),
    queryKey: ["agencyRevenue"],
  });

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

  if (isLoading) {
    return (
      <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        <Loader2 className="mx-auto h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] font-bold text-red-500">
        Error: {error.message}
      </p>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agency Revenue Details</DialogTitle>
          <DialogDescription>
            {`A concise information of an agency's income sources`}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <p id="amount" className="col-span-3">
              {amount}
            </p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="method" className="text-right">
              Payment Method
            </Label>
            <p id="method" className="col-span-3">
              {method}
            </p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <p id="status" className="col-span-3">
              {status}
            </p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stripeID" className="text-right">
              Stripe ID
            </Label>
            <p id="stripeID" className="col-span-3">
              {stripeID}
            </p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="timestamp" className="text-right">
              Timestamp
            </Label>
            <p id="timestamp" className="col-span-3">
              {timestamp}
            </p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tourId" className="text-right">
              Tour ID
            </Label>
            <p id="tourId" className="col-span-3">
              {tourId}
            </p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="touristUsername" className="text-right">
              Tourist Username
            </Label>
            <p id="touristUsername" className="col-span-3">
              {touristUsername}
            </p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="transactionId" className="text-right">
              Transaction ID
            </Label>
            <p id="transactionId" className="col-span-3">
              {transactionId}
            </p>
          </div>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AgencyCardDialog;
