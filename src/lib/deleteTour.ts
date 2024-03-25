'use server'

import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export default async function deleteTour(tourId: string) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "Agency") {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/tours/${tourId}`,
    {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.user.serverToken}`,
            // "Access-Control-Allow-Origin": "*"
        },
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