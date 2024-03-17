"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function verifyAgency(agencyId: string, status: string) {
    const session = await getServerSession(authOptions);
    console.log(session)
    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }
    if (session.user.role !== "Admin") {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/agency/verify`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${session.serverToken}`,
        },
        body: JSON.stringify({
            agencyId,
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