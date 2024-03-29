
export default async function getAgency(username: string | undefined, token: string | undefined) {
    if (!username || !token) {
        throw new Error("Username or token is undefined");
    }
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/agencies/companyInformation/${username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to get tourist");
    }

    return response.json();
}
