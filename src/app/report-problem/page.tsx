import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"
import ReportProblemForm from "@/components/ReportProblemForm";



const ReportProblem = () => {
    return (
        <div className="container flex justify-between mt-10">
            <h1 className="text-2xl font-semibold">My Reported Problems</h1>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Report problem</Button>
                </DialogTrigger>
                <ReportProblemForm />
            </Dialog>
        </div>
    );
}

export default ReportProblem;