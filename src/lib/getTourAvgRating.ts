export default async function getTourAvgRating(tourId: string) {
    const response = await fetch(
        `${process.env.BACKEND_URL}/api/v1/reviews/averageRating/${tourId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${token}`,
                // "Access-Control-Allow-Origin": "*"
            },
        },
    );
    // const res = await response.json()
    // console.log(response)
    if (!response.ok) {
        throw new Error("Failed to get tour average rating");
    }
    return response.json();
}
