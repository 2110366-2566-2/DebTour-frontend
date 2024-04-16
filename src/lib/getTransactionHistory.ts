import {undefined} from "zod";

export default async function getTransactionHistory(username: string | undefined, token: string | undefined) {
    if (!username || !token) {
        return
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/transactionPayments/tourists/${username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        throw new Error("Failed to get transaction history")
    }

    return response.json();
}