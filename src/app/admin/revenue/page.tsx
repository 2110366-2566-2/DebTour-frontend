import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function AllRevenue() {
  // Assuming agencies is an array of objects containing agency information
  const agencies = [
    {
      agencyName: "Agency 1",
      approveTime: "...",
      authorizeAdminUsername: "admin1",
      authorizeStatus: "Approved",
      bankAccount: "...",
      bankName: "...",
      email: "agency1@example.com",
      image: "...",
      licenseNo: "...",
      phone: "123456789",
      username: "agency1",
    },
    {
      agencyName: "Agency 2",
      approveTime: "...",
      authorizeAdminUsername: "admin2",
      authorizeStatus: "Pending",
      bankAccount: "...",
      bankName: "...",
      email: "agency2@example.com",
      image: "...",
      licenseNo: "...",
      phone: "987654321",
      username: "agency2",
    },
    {
      agencyName: "Agency 3",
      approveTime: "...",
      authorizeAdminUsername: "admin3",
      authorizeStatus: "Rejected",
      bankAccount: "...",
      bankName: "...",
      email: "agency3@example.com",
      image: "...",
      licenseNo: "...",
      phone: "555555555",
      username: "agency3",
    },
    {
      agencyName: "Agency 4",
      approveTime: "...",
      authorizeAdminUsername: "admin4",
      authorizeStatus: "Approved",
      bankAccount: "...",
      bankName: "...",
      email: "agency4@example.com",
      image: "...",
      licenseNo: "...",
      phone: "666666666",
      username: "agency4",
    },
    {
      agencyName: "Agency 5",
      approveTime: "...",
      authorizeAdminUsername: "admin5",
      authorizeStatus: "Pending",
      bankAccount: "...",
      bankName: "...",
      email: "agency5@example.com",
      image: "...",
      licenseNo: "...",
      phone: "777777777",
      username: "agency5",
    },
  ];

  return (
    <main>
      <div className="container">
        <h1 className="mb-20 mt-10 text-center text-4xl font-bold">
          Agency Revenue Board
        </h1>

        <div className="grid grid-cols-3 gap-6">
          {agencies.map((agency, index) => (
            <AgencyCard key={index} agency={agency} />
          ))}
        </div>
      </div>
    </main>
  );
}

interface AgencyType {
  agencyName: string;
  approveTime: string;
  authorizeAdminUsername: string;
  authorizeStatus: string;
  bankAccount: string;
  bankName: string;
  email: string;
  image: string;
  licenseNo: string;
  phone: string;
  username: string;
}

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
