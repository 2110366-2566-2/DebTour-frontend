export default async function getReviewByTourId(tourId: string) {
    const response = await fetch(`http://13.50.91.47:9000/api/v1/reviews/tour/${tourId}`, {
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