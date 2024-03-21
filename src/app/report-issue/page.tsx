"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"
import ReportIssueForm from "@/components/ReportIssueForm";
import ReportIssueTable from "@/components/ReportIssueTable";
import {useState} from "react";
import {useSession} from "next-auth/react";


export default function ReportIssue() {
    const {data: session, status, update} = useSession();
    const role = session?.user?.role ?? "Guest";
    const [reload, setReload] = useState(false);

    if (role === "Guest") {
        return (
            <div className="container flex justify-center h-[640px] items-center">
                <h1 className="text-2xl font-semibold">Please login to report an issue</h1>
            </div>
        )
    }
    else return (
        <div className="container flex flex-col gap-6 w-1/2">
            <div className="flex justify-between mt-10">
                <h1 className="text-2xl font-semibold">My Reported Issues</h1>
                <ReportIssueForm reload={reload} setReload={setReload}/>
            </div>
            <div className="flex justify-center">
                <ReportIssueTable reload={reload} setReload={setReload}/>
            </div>
        </div>
    );
}
