'use client'
import { ForwardedRef, MutableRefObject, forwardRef, useEffect, useState } from "react";
import { Agency } from "@/app/admin/verify-agency/page";
import { DialogHeader, DialogFooter, Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import verifyAgency from "@/lib/verifyAgency";
import { toast, useToast } from "../ui/use-toast";

export interface AgencyDialogRef {
    setOpen: (open: boolean) => void;
    setAgency: (agency: Agency) => void;
}

const AgencyDialog = forwardRef<AgencyDialogRef>((props, ref: ForwardedRef<AgencyDialogRef>) => {
    const [open, setOpen] = useState(false);
    const [agency, setAgency] = useState({} as Agency);
    const [image, setImage] = useState("");
    const { toast } = useToast()
    useEffect(() => {
        if (ref) {
            if (typeof ref === 'function') {
                ref({
                    setOpen,
                    setAgency
                });
            } else {
                ref.current = {
                    setOpen,
                    setAgency
                };
            }
        }
        if (agency.companyInformation) {
            setImage(`data:image/jpeg;base64,${agency.companyInformation}`);
        }
        else {
            setImage("");
        }
        console.log(agency);
    }, [open, agency, ref]);
    async function verify(username: string, status: string) {
        const response = await verifyAgency( username, status );
        if (response.status === 200) {
            toast({
                title: "Agency verified",
                description: "Agency has been verified",
            })
            setOpen(false);
        }
        else {
            toast({
                title: "Failed to verify",
                description: "Failed to verify agency",
            })
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Agency Info</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-4">
                            {
                                // check if it is google image or not
                                agency.image && agency.image.includes("googleusercontent") ?
                                <Image src={agency.image} alt="Agency Image" width={100} height={100}/>:
                                <div className="size-[100px] bg-gray-300 flex items-center justify-center">
                                    <span className="text-xs font-bold text-center">Error Google Image Profile is incorrect</span>
                                </div>
                            }
                            <div className="flex flex-col gap-4">
                                <div>
                                    <span className="font-bold">ID: </span>
                                    <span>{agency.username}</span>
                                </div>
                                <div>
                                    <span className="font-bold">Name: </span>
                                    <span>{agency.agencyName}</span>
                                </div>
                                <div>
                                    <span className="font-bold">Email: </span>
                                    <span>{agency.email}</span>
                                </div>
                                <div>
                                    <span className="font-bold">Phone: </span>
                                    <span>{agency.phone}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <span className="font-bold">License No: </span>
                            <span>{agency.licenseNo}</span>
                        </div>
                        <div>
                            <span className="font-bold">Bank Account: </span>
                            <span>{agency.bankAccount}</span>
                        </div>
                        <div>
                            <span className="font-bold">Company Info: </span>
                            {image && image!==''? <>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button className="text-blue-500 hover:underline">View Image</button>
                                </DialogTrigger>
                                <DialogContent>
                                    <Image src={image} alt="Company Image" width={0} height={0} className="size-fit max-h-screen max-w-screen"/>
                                </DialogContent>
                            </Dialog>
                            </>
                            : "N/A"
                            }
                        </div>
                    </div>
                </DialogDescription>
                <DialogFooter className="gap-3">
                    <Button size="default" className="bg-red-500 hover:bg-red-700" onClick={() => {verify(agency.username, "Unapproved")}}>
                        Unverify
                    </Button>
                    <Button size="default" className="bg-green-500 hover:bg-green-700" onClick={() => {verify(agency.username, "Approved")}}>
                        Verify
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
})

AgencyDialog.displayName = "AgencyDialog";

export default AgencyDialog;