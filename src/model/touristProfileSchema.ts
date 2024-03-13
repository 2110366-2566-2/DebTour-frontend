import {z} from "zod";

const touristProfileSchema = z.object({
    username: z.string().min(2).max(50),
    phone: z.string().min(10).max(10),
    email: z.string().email(),
    image: z.string().url(),
    citizenId: z.string().min(13).max(13),
    firstname: z.string().min(2).max(50),
    lastname: z.string().min(2).max(50),
    address: z.string().min(2).max(100),
    birthdate: z.date(),
    gender: z.enum([
        "Male",
        "Female",
        "Others",
    ]),
    defaultPayment: z.string().min(2).max(50),
});

export default touristProfileSchema;