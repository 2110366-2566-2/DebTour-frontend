export default async function getIssues(username: string | undefined, role: string | undefined, token: string | undefined) {
    let query = "";
    if (!username || !token || !role) {
        return
    }
    if (role === "Tourist" || role === "Agency") {
        query = `?username=${username}`
    } else if (role === "Admin") {
        query = "?username="
    }
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/issues` + query, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to report issue");
    }

    return response.json();

}
