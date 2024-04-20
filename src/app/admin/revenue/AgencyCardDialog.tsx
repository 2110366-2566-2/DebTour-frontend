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

const AgencyCardDialog = () => {
  const {
    amount,
    method,
    status,
    stripeID,
    timestamp,
    tourId,
    touristUsername,
    transactionId,
  } = dummyOneAgency;

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
