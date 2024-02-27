"use client"
import {Button} from "@/components/ui/button"

import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import reportProblemFormSchema from "@/model/reportProblemFormSchema";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {rejects} from "assert";

export default function ReportIssueForm() {

    const form = useForm<z.infer<typeof reportProblemFormSchema>>({
        resolver: zodResolver(reportProblemFormSchema),
        defaultValues: {
            issueType: "Other",
            message: "",
            status: "Pending",
            image: ""
        }
    });


    async function onSubmit(values: z.infer<typeof reportProblemFormSchema>) {
        const sentValues = JSON.parse(JSON.stringify(values))
        console.log(sentValues)
    }

    return (
        <DialogContent className="max-w-[640px]">
            <DialogHeader>
                <DialogTitle>Report an Issue</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name={"issueType"}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Issue Type</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an issue type"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Agency Issue">Agency Issue</SelectItem>
                                        <SelectItem value="Tour Issue">Tour Issue</SelectItem>
                                        <SelectItem value="Payment Issue">Payment Issue</SelectItem>
                                        <SelectItem value={"Bug"}>Bug</SelectItem>
                                        <SelectItem value={"Feature Request"}>Feature Request</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={"message"}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                    <Textarea {...field} className="h-[300px]"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={"image"}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Input
                                            id="picture"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files![0];
                                                //convert file into base64
                                                const reader = new FileReader();
                                                reader.readAsDataURL(file);
                                                reader.onload = () => {
                                                    let base64 = reader.result.split(',')[1] as string;
                                                    form.setValue("image", base64);
                                                };
                                                reader.onerror = (error) => {
                                                    console.log(error);
                                                };
                                            }}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
}
