import { z } from "zod";
import formSchema from '@/model/formSchema';

export default async function updateTour(token: string, tour: z.infer<typeof formSchema>, oldTour: z.infer<typeof formSchema>, tourId: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/tours/${tourId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(tour),
    });
    // console.log(response);
    if (!response.ok) {
        throw new Error("Failed to update tour");
    }
    // console.log(oldTour.activities);
    // console.log(tour.activities);
    if(oldTour.activities == tour.activities) {
        return response.json();
    }
    const response2 = await fetch(`${process.env.BACKEND_URL}/api/v1/tours/activities/${tourId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(tour.activities),
    });
    if (!response2.ok) {
        throw new Error("Failed to update activities");
    }
    return response2.json();
}