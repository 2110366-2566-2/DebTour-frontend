import { z } from "zod";

const adminManageIssueForm = z.object({
    issueId: z.number().min(0).max(1000000000),
    resolverAdminId: z.number().min(0).max(1000000000),
    status: z.enum([
        "Pending",
        "In Progress",
        "Resolved",
        "Cancelled"
    ]),
    resolveMessage: z.string().min(1).max(5000),
    resolveTimestamp: z.string().min(1).max(100),
})

export default adminManageIssueForm;