import { z } from "zod";

const memberFormSchema = z.object({
    joinedMembers: z.array(
        z.object({
            memberId: z.number().int().optional(),
            firstName: z.string().min(1).max(50).regex(/^[a-zA-Z\s]*$/),
            lastName: z.string().min(1).max(50).regex(/^[a-zA-Z\s]*$/),
            age: z.number().or(z.string().regex(/\d+/).transform(Number))
        })
    ).min(1),
    tourId: z.number().int().optional(),
    touristUsername: z.string().min(1).max(50)
}).refine((data) => {
    if(data.joinedMembers.length > 0) {
        data.joinedMembers.forEach((member) => {
            if(member.age <= 0) {
                return { message: "Age must be more than zero", path: ["joinedMembers", "age"] }
            }
        })
    }
    return true;
})

export default memberFormSchema;