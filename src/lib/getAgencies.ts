export default async function getAgencies(){
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/agencies`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }
    )
    if (!response.ok) {
        throw new Error("Failed to fetch agencies");
    }
    return response.json()
}