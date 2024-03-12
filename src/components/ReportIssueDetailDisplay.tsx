"use client";
import {DialogContent} from "@/components/ui/dialog";
import {useEffect, useMemo, useState} from "react";

export default function ReportIssueDetailDisplay(issue: any) {
    const [issueState, setIssueState] = useState({
        issueId: '',
        issueType: '',
        status: '',
        message: '',
        image: ''
    } as any);

    useEffect(() => {
        setIssueState({
            issueId: issue.issue.issueId,
            issueType: issue.issue.issueType,
            status: issue.issue.status,
            message: issue.issue.message,
            image: issue.issue.image
        });
    }, [issue]);
    return (
        <DialogContent className="max-w-[840px] max-h-[840px] overflow-y-auto">
            <div className="flex gap-2">
                <h1 className="font-bold">Issue ID</h1>
                <p>{issueState.issueId}</p>
            </div>
            <div className="flex gap-2">
                <h1 className="font-bold">Issue Type</h1>
                <p>{issueState.issueType}</p>
            </div>
            <div className="flex gap-2">
                <h1 className="font-bold">Status</h1>
                <p>{issueState.status}</p>
            </div>
            <div className="">
                <h1 className="font-bold">Message</h1>
                <p>{issueState.message}</p>
            </div>
            <div className="flex justify-center">
                <img src={'data:image/jpeg;base64,'+ issueState.image} />
            </div>
        </DialogContent>
    );
}