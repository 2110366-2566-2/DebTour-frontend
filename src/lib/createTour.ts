export default async function createTour(token: string, tour: object) {
    const response = await fetch("http://13.50.91.47:9000/api/v1/tours", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(tour),
    });
    console.log(response);
    if (!response.ok) {
        throw new Error("Failed to create tour");
    }
    return response.json();
}