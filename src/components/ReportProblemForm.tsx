
import { Button } from "@/components/ui/button"

import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const ReportProblemForm = () => {
    return (
        <DialogContent className="max-w-[640px]">
            <DialogHeader>
                <DialogTitle>Report problem</DialogTitle>
            </DialogHeader>
            <DialogFooter>
                <Button type="submit">Save changes</Button>
            </DialogFooter>
        </DialogContent>
    );
}

export default ReportProblemForm;