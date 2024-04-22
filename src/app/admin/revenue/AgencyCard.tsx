import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { AgencyType } from "./type";
import AgencyCardDialog from "./AgencyCardDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";

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
    <Card className="relative min-h-[540px] w-full rounded-3xl border-indigo-50 bg-[#F1F5FF] duration-100 hover:scale-[1.02] hover:border-indigo-200 hover:bg-indigo-100">
      <CardHeader className=" flex flex-col items-center gap-2 rounded-3xl bg-white ">
        <Avatar>
          <AvatarImage src={image} alt={agencyName} />
          <AvatarFallback>{agencyName.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="text-center">
          <CardTitle className="mb-2">{agencyName || "-"}</CardTitle>
          <CardDescription className="py-2">
            {authorizeStatus === "Approved" ? (
              <Badge className="hover:none bg-green-600">
                {authorizeStatus}
              </Badge>
            ) : (
              <Badge className="hover:none bg-gray-500">
                {authorizeStatus || "Not Approved"}
              </Badge>
            )}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="col-1 grid gap-2 break-all pt-8 text-sm">
        <div className="flex">
          <p className="w-2/5">
            <strong>Username:</strong>
          </p>
          <p className="w-3/5">{username || "-"}</p>
        </div>
        <div className="flex">
          <p className="w-2/5">
            <strong>Email:</strong>
          </p>
          <p className="w-3/5">{email || "-"}</p>
        </div>
        <div className="flex">
          <p className="w-2/5">
            <strong>Phone:</strong>
          </p>
          <p className="w-3/5">{phone || "-"}</p>
        </div>
        <div className="flex">
          <p className="w-2/5">
            <strong>Approved Time:</strong>
          </p>
          <p className="w-3/5">
            {approveTime
              ? format(parseISO(approveTime), "yyyy-MM-dd HH:mm:ss")
              : "-"}
          </p>
        </div>
        <div className="flex">
          <p className="w-2/5">
            <strong>Authorization by:</strong>
          </p>
          <p className="w-3/5">{authorizeAdminUsername || "-"}</p>
        </div>
        <div className="flex">
          <p className="w-2/5">
            <strong>Bank Account:</strong>
          </p>
          <p className="w-3/5">{bankAccount || "-"}</p>
        </div>
        <div className="flex">
          <p className="w-2/5">
            <strong>Bank Name:</strong>
          </p>
          <p className="w-3/5">{bankName || "-"}</p>
        </div>
        <div className="flex">
          <p className="w-2/5">
            <strong>License No:</strong>
          </p>
          <p className="w-3/5">{licenseNo || "-"}</p>
        </div>
      </CardContent>

      <CardFooter className="absolute bottom-0 right-0">
        <AgencyCardDialog username={username} />
      </CardFooter>
    </Card>
  );
};

export default AgencyCard;
