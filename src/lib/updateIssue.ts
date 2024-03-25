
import { z } from "zod";
import adminManageIssueForm from "@/model/adminManageIssueForm";

export default async function updateIssue(token: string | undefined, issue: z.infer<typeof adminManageIssueForm>) {
    if (!token) {
        throw new Error("No token provided");
    }
    const response = await fetch(`http://13.50.91.47:9000/api/v1/issues/${issue.issueId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(issue),
    });

    if (!response.ok) {
        throw new Error("Failed to update issue");
    }
    return response.json();
}