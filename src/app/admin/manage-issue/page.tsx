import ReportIssueTable from "@/components/ReportIssueTable";


export default function ManageIssue() {
    return (
        <div className="container flex flex-col gap-6 w-1/2">
            <div className="flex justify-between mt-10">
                <h1 className="text-2xl font-semibold">User Reported Issues</h1>
            </div>
            <div className="flex justify-center">
                <ReportIssueTable role="admin"/>
            </div>
        </div>
    );
}