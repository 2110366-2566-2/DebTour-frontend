import {z} from "zod";

const agencyProfileSchema = z.object({
    phone: z.string().min(10).max(10),
    email: z.string().email(),
    image: z.string().url(),
    agencyName: z.string().min(2).max(50),
    address: z.string().min(2).max(100),
    licenseNumber: z.string().min(1).max(50),
    bankAccount: z.string().min(10).max(10),
    authorizeAdminId: z.number(),
    authorizeStatus: z.enum([
        "Pending",
        "Approved",
        "Rejected",
    ]),
    approveTime: z.date(),
});

export default agencyProfileSchema;