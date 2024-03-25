
export default async function getMe(username: string | undefined, token: string | undefined) {

    if (!username || !token) {
        return
    }
    console.log("getMe: ", username, token)
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/getMe`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to get user");
    }

    return response.json();
}