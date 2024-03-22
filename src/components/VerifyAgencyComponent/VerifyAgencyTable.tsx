'use client'
import { useEffect, useRef, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import AgencyDialog, { AgencyDialogRef } from "./AgencyDialog";
import getAgencies from "@/lib/getAgencies";
import { format } from "date-fns";

export type Agency = {
    username: string;
    phone: string;
    email: string;
    image: string;
    role: string;
    agencyName: string;
    licenseNo: string;
    bankAccount: string;
    companyInformation: string;
    authorizeAdminUsername: string;
    authorizeStatus: string;
    approveTime: string;
}

export default function VerifyAgencyTable() {
    const [agencies, setAgencies] = useState([] as Agency[]);
    const fetchAgencies = async () => {
        const res = await getAgencies().then(
            (res) => {
                if(res && res.status === 200) {
                    setAgencies(res.body.data);
                }
            }
        );
    }
    const Dialog = useRef<AgencyDialogRef>(null);
    const sendProps = {
        reload: fetchAgencies
    };
    useEffect(() => {
        fetchAgencies();
    }, []);
    return (
        <div>
            <AgencyDialog ref={Dialog} {...sendProps}/>
            <Table>
                <TableCaption>A list of Agencies</TableCaption>
                <TableHeader>
                    <TableRow>
                        {/* <TableHead>ID</TableHead> */}
                        <TableHead>Name</TableHead>
                        <TableHead className="md:table-cell hidden">Email</TableHead>
                        <TableHead className="md:table-cell hidden">Phone</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="lg:table-cell hidden">Authorized by</TableHead>
                        <TableHead className="lg:table-cell hidden">Authorized Date</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {agencies.map((agency: Agency) => (
                        <TableRow key={agency.username}>
                            {/* <TableCell>{agency.username}</TableCell> */}
                            <TableCell>{agency.agencyName}</TableCell>
                            <TableCell className="sm:table-cell hidden">{agency.email}</TableCell>
                            <TableCell className="sm:table-cell hidden">{agency.phone}</TableCell>
                            {/* <TableCell>{agency.role}</TableCell> */}
                            {/* <TableCell>{agency.license_no}</TableCell> */}
                            {/* <TableCell>{agency.bank_account}</TableCell> */}
                            <TableCell>{agency.authorizeStatus === "Approved" ?
                                <span className="w-full rounded bg-green-500 px-4 py-1 text-white font-bold">Verified</span> : 
                                <span className="w-full rounded bg-red-500 px-2 py-1 text-white font-bold">Unverified</span>
                            }</TableCell>
                            <TableCell className="lg:table-cell hidden">{
                                (agency.authorizeStatus === "Approved" ? agency.authorizeAdminUsername : "N/A")
                            }</TableCell>
                            <TableCell className="lg:table-cell hidden">{
                                (agency.authorizeStatus === "Approved" ? format(new Date(agency.approveTime), "MMMM do, yyyy H:mma") : "N/A")
                            }</TableCell>
                            <TableCell>
                                <Button size="default" variant="outline" onClick={() => { 
                                    if (!Dialog || !Dialog.current) return; 
                                    const dialogRef = Dialog.current;
                                    dialogRef.setAgency(agency); 
                                    dialogRef.setOpen(true); 
                                }}>
                                    Verify Info
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}