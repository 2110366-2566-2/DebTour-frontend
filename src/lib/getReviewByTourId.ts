export default async function getReviewByTourId(tourId: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/reviews/tour/${tourId}`, {
        method: "GET",
        headers: {
            // "Content-Type": "application/json"
        }
    })
    if (!response.ok) {
        throw new Error("Failed to fetch reviews");
    }
    return response.json();
}