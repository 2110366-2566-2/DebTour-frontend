'use server'
import memberFormSchema from "@/model/memberFormSchema";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { z } from "zod";

export default async function joinTour(memberForm: z.infer<typeof memberFormSchema>) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "Agency") {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/joinings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.user.serverToken}`,
        },
        body: JSON.stringify(memberForm),
    });
    if (!response.ok) {
        throw new Error("Failed to join tour");
    }
    return response.json();
}