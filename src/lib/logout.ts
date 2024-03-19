export default async function logout(token: string | undefined) {
    if (!token) {
        return
    }
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/logout`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to logout");
    }

    return response.json();

}