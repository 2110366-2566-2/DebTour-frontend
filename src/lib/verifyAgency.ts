"use server";

import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export default async function verifyAgency(username: string, status: string) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "Admin") {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/agency/verify`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.user.serverToken}`,
        },
        body: JSON.stringify({
            username,
            status
        }),
    });
    if (!response.ok) {
        return {
            status: 500,
            body: "Failed to verify agency",
        };
    }
    return {
        status: 200,
        body: "Agency verified",
    };
}