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
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import TransactionHistoryCard from "./TransactionHistoryCard";
import { Key } from "react";

const AgencyCardDialog = ({ username }: { username: string }) => {
  const { data: session } = useSession();

  async function getAgenciesRevenue() {
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
    data: agenciesRevenue,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getAgenciesRevenue(),
    queryKey: ["agenciesRevenue"],
  });

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
        {agenciesRevenue ? (
          agenciesRevenue.map((a: any, index: Key) => (
            <TransactionHistoryCard key={index} agencyRevenue={a} />
          ))
        ) : (
          <p>This agency has no revenue history.</p>
        )}

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AgencyCardDialog;
