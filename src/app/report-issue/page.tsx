import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"
import ReportIssueForm from "@/components/ReportIssueForm";


export default function ReportIssue() {
    return (
        <div className="container flex justify-between mt-10">
            <h1 className="text-2xl font-semibold">My Reported Issues</h1>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Report an Issue</Button>
                </DialogTrigger>
                <ReportIssueForm/>
            </Dialog>
        </div>
    );
}
