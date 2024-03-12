import { z } from "zod";
import reportIssueFormSchema from "@/model/reportProblemFormSchema";
export default async function reportIssue(token: string, reportIssueForm: z.infer<typeof reportIssueFormSchema>) {
    const response = await fetch(`http://13.50.91.47:9000/api/v1/issues`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${token}`,

        },
        body: JSON.stringify(reportIssueForm),
    });

    if (!response.ok) {
        throw new Error("Failed to report issue");
    }

    return response.json();
    
}