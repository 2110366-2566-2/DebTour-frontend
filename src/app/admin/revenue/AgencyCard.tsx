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
        <Button variant="outline">Details</Button>
      </CardFooter>
    </Card>
  );
};

export default AgencyCard;
