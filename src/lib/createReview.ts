'use server'
import reviewFormSchema from "@/model/reviewFormSchema"
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { z } from "zod"

export default async function createReview(reviewData: z.infer<typeof reviewFormSchema>) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "Tourist") {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/reviews/tour/${reviewData.tourId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.user.serverToken}`,
        },
        body: JSON.stringify(reviewData),
    });
    if (!response.ok) {
        return {
            success: false,
        };
    }
    return {
        success: true,
    };
}