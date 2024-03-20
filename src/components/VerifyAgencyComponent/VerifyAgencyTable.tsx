'use client'
import { MutableRefObject, useRef } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import AgencyDialog, { AgencyDialogRef } from "./AgencyDialog";
import { Agency } from "@/app/admin/verify-agency/page";

interface VerifyAgencyTableProps {
    agencies: Agency[];
}

export default function VerifyAgencyTable({agencies}: VerifyAgencyTableProps) {
    const Dialog = useRef<AgencyDialogRef>(null);
    return (
        <div>
            <AgencyDialog ref={Dialog}/>
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
                            <TableCell>{agency.authorizeStatus === "Authorized" ?
                                <span className="w-full rounded bg-green-500 px-4 py-1 text-white font-bold">Verified</span> : 
                                <span className="w-full rounded bg-red-500 px-2 py-1 text-white font-bold">Unverified</span>
                            }</TableCell>
                            <TableCell className="lg:table-cell hidden">{
                                (agency.authorizeStatus === "Authorized" ? agency.authorizeAdminUsername : "N/A")
                            }</TableCell>
                            <TableCell className="lg:table-cell hidden">{
                                (agency.authorizeStatus === "Authorized" ? agency.approveTime : "N/A")
                            }</TableCell>
                            <TableCell>
                                <Button size="default" variant="outline" onClick={() => { 
                                    // console.log(Dialog)
                                    // console.log(Dialog.current)
                                    if (!Dialog || !Dialog.current) return; // Added check for Dialog existence
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