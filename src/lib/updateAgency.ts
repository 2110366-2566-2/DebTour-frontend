import { z } from "zod";
import agencyProfileSchema from "@/model/agencyProfileSchema";


export default async function updateAgency(username: string | undefined, token: string | undefined, data: z.infer<typeof agencyProfileSchema>) {
    if (!username || !token) {
        throw new Error('Username or token is undefined');
    }

    let d = {
        ...data,
        username: username
    }
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/agencies/${username}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(d)
    });

    if (!response.ok) {
        throw new Error('Failed to update agency profile');
    }

    return response.json();
}
