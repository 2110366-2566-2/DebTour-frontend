import reviewFormSchema from "@/model/reviewFormSchema"
import { z } from "zod"

export default async function createReview(token: string, reviewData: z.infer<typeof reviewFormSchema>) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/reviews/tour/${reviewData.tourId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(reviewData),
    });
    return response.json();
}