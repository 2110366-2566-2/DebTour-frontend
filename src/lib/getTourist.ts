
export default async function getTourist(username: string | undefined, token: string | undefined) {
    if (!username) {
        return
    }
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/tourists/${username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to get tourist");
    }

    return response.json();
}