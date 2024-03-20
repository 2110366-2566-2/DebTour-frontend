'use server'
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export default async function getTourMember(tourId: string) {
  const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "Agency") {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/tours/tourists/${tourId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session.user.serverToken}`,
        // "Access-Control-Allow-Origin": "*"
      },
    },
  );
  if (!response.ok) {
    throw new Error("Failed to get tour member");
  }
  return response.json();
}
