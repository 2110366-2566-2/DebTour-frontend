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
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

const AgencyCardDialog = ({ username }: { username: string }) => {
  const { data: session } = useSession();

  async function getAgencyRevenue() {
    const token = session?.user?.serverToken;
    const backendUrl = process.env.BACKEND_URL;

    const res = await axios.get(
      `${backendUrl}/api/v1/agencies/getRevenue/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data.data;
  }

  const {
    data: agencyRevenue,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getAgencyRevenue(),
    queryKey: ["agencyRevenue"],
  });

  // console.log("agencyRevenue", agencyRevenue);

  if (isLoading) {
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
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  if (error) {
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
          <div className="mx-auto my-auto flex justify-center text-center text-red-500">
            {error.message}
          </div>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  if (!agencyRevenue) {
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
          <div className="mx-auto my-auto flex justify-center text-center">
            This agency has no revenue information.
          </div>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
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
            <p id="amount" className="col-span-3"></p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="method" className="text-right">
              Payment Method
            </Label>
            <p id="method" className="col-span-3"></p>
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
            <p id="stripeID" className="col-span-3"></p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="timestamp" className="text-right">
              Timestamp
            </Label>
            <p id="timestamp" className="col-span-3"></p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tourId" className="text-right">
              Tour ID
            </Label>
            <p id="tourId" className="col-span-3"></p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="touristUsername" className="text-right">
              Tourist Username
            </Label>
            <p id="touristUsername" className="col-span-3"></p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="transactionId" className="text-right">
              Transaction ID
            </Label>
            <p id="transactionId" className="col-span-3"></p>
          </div>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AgencyCardDialog;
