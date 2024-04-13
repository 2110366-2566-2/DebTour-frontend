"use client";

import { DialogContent, DialogFooter } from "@/components/ui/dialog";
import adminManageIssueForm from "@/model/adminManageIssueForm";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import updateIssue from "@/lib/updateIssue";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";

export default function ReportIssueDetailDisplay({
  issue,
  setSelectedIssue,
  reload,
  setReload,
}: {
  issue: any;
  setSelectedIssue: any;
  reload: boolean;
  setReload: any;
}) {
  let { data: session, status, update } = useSession();
  let role = session?.user.role;
  const token = session?.user.serverToken;
  if (role === "Tourist" || role === "Agency") {
    role = "User";
  }

  const form = useForm<z.infer<typeof adminManageIssueForm>>({
    resolver: zodResolver(adminManageIssueForm),
    defaultValues: {
      issueId: issue.issueId,
      resolverAdminId: issue.resolverAdminId,
      status: issue.status,
      resolveMessage: issue.resolveMessage,
      resolveTimestamp: issue.resolveTimestamp,
    },
  });

  async function onSubmit(values: z.infer<typeof adminManageIssueForm>) {
    setSelectedIssue({
      issueId: "",
      issueType: "",
      status: "",
      message: "",
      image: "",
      reporterUsername: "",
      reportTimestamp: "",
      resolverAdminId: 0,
      resolveMessage: "",
      resolveTimestamp: "",
    });
    values.issueId = issue.issueId;
    values.resolveTimestamp = new Date().toISOString();
    console.log(JSON.stringify(values));
    const res = await updateIssue(token, values);
    if (!res.success) {
      console.log("Failed to update issue");
    }
    console.log("Successfully updated issue");
    toast({
      title: "Issue updated",
      description: "Issue has been updated successfully",
    });
    setReload(!reload);
  }

  return (
    <DialogContent className="max-h-[740px] max-w-[840px] overflow-y-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          {role === "User" && (
            <div className="flex gap-2">
              <h1 className="font-bold">Status</h1>
              <p>{issue.status}</p>
            </div>
          )}
          {role === "Admin" && (
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex w-[200px] items-center justify-center gap-2 p-0">
                  <label className="font-bold">Status</label>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={"Select an status"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value={"In Progress"}>In Progress</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                      <SelectItem value={"Cancelled"}>Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
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
            <img src={"data:image/jpeg;base64," + issue.image} />
          </div>
          {role === "User" && (
            <div>
              <h1 className="font-bold">Resolve Message</h1>
              <p>{issue.resolveMessage}</p>
            </div>
          )}
          {role == "Admin" && (
            <div>
              <h1 className="font-bold">Resolve Message</h1>
              <FormField
                control={form.control}
                name="resolveMessage"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <textarea {...field} className="h-[300px] w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          <DialogFooter>
            {role === "Admin" && <Button type="submit">Resolve Issue</Button>}
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
