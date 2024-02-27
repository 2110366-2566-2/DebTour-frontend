
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
import {useForm} from "react-hook-form";
import formSchema from "@/model/formSchema";
import { z } from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

export default function ReportIssueForm() {
    // const form = useForm<z.infer<typeof formSchema>>({
    //     resolver: zodResolver(formSchema),
    //     defaultValues: {
    //
    //     },
    // });
    return (
        <DialogContent className="max-w-[640px]">
            <DialogHeader>
                <DialogTitle>Report an Issue</DialogTitle>
            </DialogHeader>
            <DialogFooter>
                <Button type="submit">Save changes</Button>
            </DialogFooter>
        </DialogContent>
    );
}
