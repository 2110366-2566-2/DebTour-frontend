import { z } from "zod";

const reportIssueFormSchema = z.object({
    issueId: z.number().int().optional(),
    issueType: z.enum([
        "Agency Issue",
        "Tour Issue",
        "Payment Issue",
        "Bug",
        "Feature Request",
        "Other"
    ]),
    message: z.string().min(1).max(5000),
    status: z.enum([
        "Pending",
        "In Progress",
        "Resolved",
        "Cancelled"
    ]),
    image: z.string().optional()
})

export default reportIssueFormSchema;