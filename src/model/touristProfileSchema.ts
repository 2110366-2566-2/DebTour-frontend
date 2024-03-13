import {z} from "zod";

const touristProfileSchema = z.object({
    phone: z.string().min(10).max(10),
    email: z.string().email(),
    image: z.string().url(),
    citizenId: z.string().min(13).max(13),
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    address: z.string().min(2).max(100),
    birthDate: z.date(),
    gender: z.enum([
        "Male",
        "Female",
        "Others",
    ]),
    defaultPayment: z.enum([
        "Credit Card",
        "Debit Card",
        "Paypal",
        "PromptPay",
        "Mobile Banking",
    ])
});

export default touristProfileSchema;