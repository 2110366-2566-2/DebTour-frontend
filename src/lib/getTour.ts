export default async function getTour(tourId: string) {
    const response = await fetch(`http://13.50.91.47:9000/api/v1/tours/${tourId}`,
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${token}`,
            // "Access-Control-Allow-Origin": "*"
        },
    });
    // const res = await response.json()
    // console.log(response)
    if (!response.ok) {
        throw new Error("Failed to get tour");
    }
    return response.json();
}