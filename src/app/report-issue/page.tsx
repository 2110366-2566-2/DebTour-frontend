import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"
import ReportIssueForm from "@/components/ReportIssueForm";
import ReportIssueTable from "@/components/ReportIssueTable";


export default function ReportIssue() {
    return (
        <div className="container flex flex-col gap-6 w-1/2">
            <div className="flex justify-between mt-10">
                <h1 className="text-2xl font-semibold">My Reported Issues</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Report an Issue</Button>
                    </DialogTrigger>
                    <ReportIssueForm/>
                </Dialog>
            </div>
            <div className="flex justify-center">
                <ReportIssueTable/>
            </div>
        </div>
    );
}
