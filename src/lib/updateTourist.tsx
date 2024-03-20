import { z } from "zod";
import touristProfileSchema from "@/model/touristProfileSchema";


export default async function updateTourist(username: string | undefined, token: string | undefined, data: z.infer<typeof touristProfileSchema>) {
    if (!username) {
        return
    }

    let d = {
        username: username,
        Gender: data.gender,
        address: data.address,
        phone: data.phone,
        email: data.email,
        birthDate: data.birthDate.toLocaleDateString(),
        citizenId: data.citizenId,
        firstName: data.firstName,
        lastName: data.lastName,
        defaultPayment: data.defaultPayment,
        image: data.image
    }
    console.log(d)
    console.log(username)
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/tourists/${username}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(d)
    });

    if (!response.ok) {
        throw new Error('Failed to update tourist profile');
    }

    return response.json();
}