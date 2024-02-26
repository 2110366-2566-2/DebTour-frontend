import { z } from "zod";

const reviewFormSchema = z.object({
    description: z.string().min(1).max(1000),
    ratingScore: z.number().or(z.string().regex(/\d+/).transform(Number)),
    tourId: z.number().int(),
    touristUsername: z.string().min(1).max(50),
}).refine((data) => {
    if(data.ratingScore <= 1 || data.ratingScore > 5) {
        return { message: "Rating must be between 1 and 5", path: ["rating"] }
    }
    return true;
})

export default reviewFormSchema;