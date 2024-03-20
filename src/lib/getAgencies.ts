'use server'
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export default async function getAgencies(){
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "Admin") {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/agencies/companyInformation`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.user.serverToken}`,
        },
    }
    )
    if (!response.ok) {
        return {
            status: 500,
            body: "Failed to get agencies",
        };
    }
    return {
        status: 200,
        body: await response.json(),
    };
}