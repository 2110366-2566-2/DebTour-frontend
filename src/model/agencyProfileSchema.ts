import {z} from "zod";

const agencyProfileSchema = z.object({
    phone: z.string().min(10).max(10),
    email: z.string().email(),
    image: z.string().url(),
    agencyName: z.string().min(2).max(50),
    address: z.string().min(2).max(100),
    licenseNo: z.string().min(1).max(50),
    bankAccount: z.string().min(10).max(10),
    authorizeAdminUsername: z.string(),
    authorizeStatus: z.enum([
        "Pending",
        "Approved",
        "Rejected",
    ]),
    // approveTime: z.date(),
});

export default agencyProfileSchema;