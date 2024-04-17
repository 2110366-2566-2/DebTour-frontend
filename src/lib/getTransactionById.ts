'use server'
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export default async function getTransactionById(transactionId: string) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "Tourist") {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/transactionPayments/${transactionId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.user.serverToken}`,
            // "Access-Control-Allow-Origin": "*"
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch transaction");
    }
    return response.json();
}