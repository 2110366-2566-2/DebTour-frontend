import memberFormSchema from "@/model/memberFormSchema";
import { z } from "zod";

export default async function joinTour(token: string, memberForm: z.infer<typeof memberFormSchema>) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/joinings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(memberForm),
    });
    if (!response.ok) {
        throw new Error("Failed to join tour");
    }
    return response.json();
}