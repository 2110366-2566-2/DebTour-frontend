import { z } from "zod";
import reportIssueFormSchema from "@/model/reportProblemFormSchema";
export default async function reportIssue(username:string | undefined, role: string, token: string | undefined, reportIssueForm: z.infer<typeof reportIssueFormSchema>) {
    if (!username, !token) {
        return
    }
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/issues`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(reportIssueForm),
    });

    if (!response.ok) {
        throw new Error("Failed to report issue");
    }

    return response.json();
    
}