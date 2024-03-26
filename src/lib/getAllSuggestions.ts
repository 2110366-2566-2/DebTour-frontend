
export default async function getAllSuggestions(token: string| undefined) {
    if (!token) {
        return
    }
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/suggestions/location`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to get suggestions");
    }

    return response.json();
}