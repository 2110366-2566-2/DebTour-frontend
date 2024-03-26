export default async function createSuggestions(token: string | undefined, suggestion: object) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/suggestions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(suggestion)
    });
    if (!response.ok) {
        return {
            success: false,
        };
    }
    return {
        success: true,
    };
}