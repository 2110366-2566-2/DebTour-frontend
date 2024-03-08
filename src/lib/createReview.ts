import reviewFormSchema from "@/model/reviewFormSchema"
import { z } from "zod"

export default async function createReview(reviewData: z.infer<typeof reviewFormSchema>, token: string) {
    const response = await fetch(`http://13.50.91.47:9000/api/v1/reviews/tour/${reviewData.tourId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(reviewData),
    });
    return response.json();
}