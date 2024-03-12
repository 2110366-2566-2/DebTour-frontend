export default async function getIssues(token: string, username: string) {
    let query = "";
    if (username !== "") {
        query = `?username=${username}`;
    }
    const response = await fetch(`http://13.50.91.47:9000/api/v1/issues`+query, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${token}`,

        },
    });

    if (!response.ok) {
        throw new Error("Failed to report issue");
    }

    return response.json();

}
