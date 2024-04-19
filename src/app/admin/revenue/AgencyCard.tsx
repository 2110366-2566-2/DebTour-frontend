import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { AgencyType } from "./agencyType";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AgencyCardDialog from "./AgencyCardDialog";

const AgencyCard = ({ agency }: { agency: AgencyType }) => {
  const {
    agencyName,
    approveTime,
    authorizeAdminUsername,
    authorizeStatus,
    bankAccount,
    bankName,
    email,
    image,
    licenseNo,
    phone,
    username,
  } = agency;

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

  return (
    <Card className="w-full">
      <CardHeader className="my-2 flex flex-col items-center gap-2">
        <div className="text-center">
          <CardTitle className="mb-2">{agencyName}</CardTitle>
          <CardDescription>{authorizeStatus}</CardDescription>
        </div>

        {/* <Image src={image} alt={agencyName} width={100} height={100} /> */}
      </CardHeader>

      <CardContent>
        <p>
          <strong>Username:</strong> {username}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Approve Time:</strong> {approveTime}
        </p>
        <p>
          <strong>Authorize Admin Username:</strong> {authorizeAdminUsername}
        </p>
        <p>
          <strong>Bank Account:</strong> {bankAccount}
        </p>
        <p>
          <strong>Bank Name:</strong> {bankName}
        </p>
        <p>
          <strong>License No:</strong> {licenseNo}
        </p>
        <p>
          <strong>Phone:</strong> {phone}
        </p>
      </CardContent>

      <CardFooter className="flex justify-end">
        <AgencyCardDialog />
      </CardFooter>
    </Card>
  );
};

export default AgencyCard;
