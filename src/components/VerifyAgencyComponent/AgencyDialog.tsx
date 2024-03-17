'use client'
import { MutableRefObject, forwardRef, useEffect, useState } from "react";
import { Agency } from "@/components/VerifyAgencyComponent/VerifyAgencyTable";
import { DialogHeader, DialogFooter, Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import verifyAgency from "@/lib/verifyAgency";
import { toast, useToast } from "../ui/use-toast";

interface AgencyDialogRef {
    setOpen: (open: boolean) => void;
    setAgency: (agency: Agency) => void;
}

const AgencyDialog = forwardRef<AgencyDialogRef>((props, ref) => {
    const [open, setOpen] = useState(false);
    const [agency, setAgency] = useState({} as Agency);
    const { toast } = useToast()
    useEffect(() => {
        if (ref) {
            ref.current = {
                setOpen,
                setAgency
            };
        }
    }, [open, agency, ref]);
    async function verify(id: string, status: string) {
        const response = await verifyAgency( id, status );
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
                            <Image src={agency.google_image} alt="Agency Image" width={100} height={100}/>
                            <div className="flex flex-col gap-4">
                                <div>
                                    <span className="font-bold">Name: </span>
                                    <span>{agency.name}</span>
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
                            <span>{agency.license_no}</span>
                        </div>
                        <div>
                            <span className="font-bold">Bank Account: </span>
                            <span>{agency.bank_account}</span>
                        </div>
                        <div>
                            <span className="font-bold">Company Info: </span>
                            <Link href={agency.company_info_image} target="_blank">View Image</Link>
                        </div>
                    </div>
                </DialogDescription>
                <DialogFooter className="gap-3">
                    <Button size="default" className="bg-red-500 hover:bg-red-700" onClick={() => {verify(agency.id, "Unapproved")}}>
                        Unverify
                    </Button>
                    <Button size="default" className="bg-green-500 hover:bg-green-700" onClick={() => {verify(agency.id, "Approved")}}>
                        Verify
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
})
export default AgencyDialog;