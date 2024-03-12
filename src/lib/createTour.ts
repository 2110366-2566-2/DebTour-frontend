export default async function createTour(token: string, tour: object) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/tours`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${token}`,
            // "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(tour),
    });
    // const res = await response.json()
    // console.log(res)
    if (!response.ok) {
        throw new Error("Failed to create tour");
    }
    return response.json();
}