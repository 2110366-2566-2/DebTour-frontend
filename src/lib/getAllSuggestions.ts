
export default async function getAllSuggestions(username:string|undefined, role:string|undefined, token: string| undefined) {
    if (!username || !token) {
        return
    }
    if (role === "Tourist") {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/suggestions/tourist/${username}`, {
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
    } else {
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
}