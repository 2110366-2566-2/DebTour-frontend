"use client"
import ReportIssueTable from "@/components/ReportIssueTable";
import {useSession} from "next-auth/react";
import {useState} from "react";


export default function ManageIssue() {
    const {data: session, status, update} = useSession();
    const role = session?.user?.role ?? "Guest";
    const [reload, setReload] = useState(false);
    if (role !== "Admin") {
        return (
            <div className="container flex justify-center h-[640px] items-center">
                <h1 className="text-2xl font-semibold">You are not authorized to view this page</h1>
            </div>
        )
    } else
        return (
            <div className="container flex flex-col gap-6 w-1/2">
                <div className="flex justify-between mt-10">
                    <h1 className="text-2xl font-semibold">User Reported Issues</h1>
                </div>
                <div className="flex justify-center">
                    <ReportIssueTable reload={reload} setReload={setReload}/>
                </div>
            </div>
        );
}