"use client";
import {DialogContent} from "@/components/ui/dialog";
import {useEffect, useMemo, useState} from "react";

export default function ReportIssueDetailDisplay({issue}: { issue: any }) {
    // const [issueState, setIssueState] = useState({
    //     issueId: '',
    //     issueType: '',
    //     status: '',
    //     message: '',
    //     image: ''
    // } as any);
    //
    // useEffect(() => {
    //     setIssueState({
    //         issueId: issue.issue.issueId,
    //         issueType: issue.issue.issueType,
    //         status: issue.issue.status,
    //         message: issue.issue.message,
    //         image: issue.issue.image
    //     });
    // }, [issue]);
    return (
        <DialogContent className="max-w-[840px] max-h-[840px] overflow-y-auto">
            <div className="flex gap-2">
                <h1 className="font-bold">Issue ID</h1>
                <p>{issue.issueId}</p>
            </div>
            <div className="flex gap-2">
                <h1 className="font-bold">Reporter Username</h1>
                <p>{issue.reporterUsername}</p>
            </div>
            <div className="flex gap-2">
                <h1 className="font-bold">Issue Type</h1>
                <p>{issue.issueType}</p>
            </div>
            <div className="flex gap-2">
                <h1 className="font-bold">Status</h1>
                <p>{issue.status}</p>
            </div>
            <div className="flex gap-2">
                <h1 className="font-bold">Report Timestamp</h1>
                <p>{issue.reportTimestamp}</p>
            </div>
            <div className="flex gap-2">
                <h1 className="font-bold">Resolver Admin ID</h1>
                <p>{issue.resolverAdminId}</p>
            </div>
            <div className="flex gap-2">
                <h1 className="font-bold">Resolve Timestamp</h1>
                <p>{issue.resolveTimestamp}</p>
            </div>
            <div className="">
                <h1 className="font-bold">Message</h1>
                <div className="w-[480px]">
                    <p>{issue.message}</p>
                </div>
            </div>
            <div>
                <h1 className="font-bold">Image</h1>
                <img src={'data:image/jpeg;base64,'+ issue.image} />
            </div>
            <div>
                <h1 className="font-bold">Resolve Message</h1>
                <p>{issue.resolveMessage}</p>
            </div>
        </DialogContent>
    );
}