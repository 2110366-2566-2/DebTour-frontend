'use client'
import { Suspense, use, useRef } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import VerifyAgencyTableBody from "@/components/VerifyAgencyComponent/VerifyAgencyTableBody";
import { Button } from "../ui/button";
import AgencyDialog from "./AgencyDialog";

export type Agency = {
    id: string;
    phone: string;
    email: string;
    google_image: string;
    role: string;
    name: string;
    license_no: string;
    bank_account: string;
    company_info_image: string;
    authorized_by: string;
    authorize_status: string;
    authorized_date: string;
}

export default function VerifyAgencyTable() {
    // const agencies = await getAgencies();
    const agencies = [
        {
            id: "1",
            phone: "1234567890",
            email: "temp@gmail.com",
            google_image: "https://lh3.googleusercontent.com/a/ACg8ocJmCjfnMrgZjkyzArjkQEaLLh034lCpXTxuaxOqDJ-t=s96-c",
            role: "Agency",
            name: "Agency 1",
            license_no: "1234567890",
            bank_account: "1234567890",
            company_info_image: `https://lh3.googleusercontent.com/a/ACg8ocJmCjfnMrgZjkyzArjkQEaLLh034lCpXTxuaxOqDJ-t=s96-c`,
            authorized_by: "1234",
            authorize_status: "Authorized",
            authorized_date: "2021-08-20"
        },
        {
            id: "2",
            phone: "1234567890",
            email: "temp2@gmail.com",
            google_image: "https://lh3.googleusercontent.com/a/ACg8ocJmCjfnMrgZjkyzArjkQEaLLh034lCpXTxuaxOqDJ-t=s96-c",
            role: "Agency",
            name: "Agency 2",
            license_no: "1234567890",
            bank_account: "1234567890",
            company_info_image: "https://lh3.googleusercontent.com/a/ACg8ocJmCjfnMrgZjkyzArjkQEaLLh034lCpXTxuaxOqDJ-t=s96-c",
            authorized_by: "1234",
            authorize_status: "Unauthorized",
            authorized_date: "2021-08-20"
        }
    ] as Agency[];
    const Dialog = useRef(null);
    return (
        <div>
            <Table>
                <TableCaption>A list of Agencies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
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
                    {agencies.map((agency) => (
                        <TableRow key={agency.id}>
                            <TableCell>{agency.id}</TableCell>
                            <TableCell>{agency.name}</TableCell>
                            <TableCell className="sm:table-cell hidden">{agency.email}</TableCell>
                            <TableCell className="sm:table-cell hidden">{agency.phone}</TableCell>
                            {/* <TableCell>{agency.role}</TableCell> */}
                            {/* <TableCell>{agency.license_no}</TableCell> */}
                            {/* <TableCell>{agency.bank_account}</TableCell> */}
                            <TableCell>{agency.authorize_status=== "Authorized" ? 
                                <span className="w-full rounded bg-green-500 px-4 py-1 text-white font-bold">Verified</span> : 
                                <span className="w-full rounded bg-red-500 px-2 py-1 text-white font-bold">Unverified</span>
                            }</TableCell>
                            <TableCell className="lg:table-cell hidden">{
                                (agency.authorize_status === "Authorized" ? agency.authorized_by : "N/A")
                            }</TableCell>
                            <TableCell className="lg:table-cell hidden">{
                                (agency.authorize_status === "Authorized" ? agency.authorized_date : "N/A")
                            }</TableCell>
                            <TableCell>
                                <Button size="default" variant="outline" onClick={() => { Dialog.current.setAgency(agency); Dialog.current.setOpen(true); }}>
                                    Verify Info
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    <AgencyDialog ref={Dialog}/>
                </TableBody>
            </Table>
        </div>
    )
}