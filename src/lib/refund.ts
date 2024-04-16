
export default async function refund(transactionId: string | undefined, token: string | undefined) {
    if (!transactionId || !token) {
        return
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/transactionPayments/refund/${transactionId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        throw new Error("Failed to refund")
    }

    return response.json();
}
