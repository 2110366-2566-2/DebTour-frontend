"use client";

import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useSession} from "next-auth/react";
import {ReactNode, useEffect, useState} from "react";
import getTransactionHistory from "@/lib/getTransactionHistory";
import {Button} from "@/components/ui/button";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import refund from "@/lib/refund";
import {toast} from "@/components/ui/use-toast";
import Link from "next/link";


export default function TransactionHistoryTable() {
    const { data: session, status, update } = useSession();
    const role = session?.user?.role;
    const username = session?.user?.id;
    const token = session?.user?.serverToken;
    // console.log(username, token)

    const [transactionHistory, setTransactionHistory] = useState([] as any[])

    useEffect(() => {
        async function get() {
            let res = await getTransactionHistory(username, token);
            
            if (!res) return;
            if (!res.data) return;
            let temp = [];
            for (let i = 0; i < res.data.length; i++) {
                let timestamp = new Date(res.data[i].timestamp);
                let timestampStr = timestamp.toLocaleString();
                temp.push({
                    amount: res.data[i].amount,
                    method: res.data[i].method,
                    status: res.data[i].status,
                    timestamp: timestampStr,
                    tourId: res.data[i].tourId,
                    transactionId: res.data[i].transactionId
                })
            }
            console.log(res.data)
            setTransactionHistory(temp);
        }
        get();

    }, [username, token])
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent transaction</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Transaction ID</TableHead>
                        <TableHead>Tour ID</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Timestamp</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactionHistory.length? (
                        transactionHistory.map((transaction) => (
                            <TableRow
                                key={transaction.transactionId}
                            >
                                <TableCell className={"w-[50px]"}>
                                    <Link href={`/tourist/transaction-history/${transaction.transactionId}`} replace className="text-blue-500 hover:underline">
                                        {transaction.transactionId}
                                    </Link>
                                </TableCell>
                                <TableCell className="w-[50px]">{transaction.tourId}</TableCell>
                                <TableCell className="w-[100px]">{transaction.method}</TableCell>
                                <TableCell className="w-[100px]">{transaction.amount}</TableCell>
                                <TableCell className="w-[100px]">{transaction.status}</TableCell>
                                <TableCell className="w-[120px] text-xs">{transaction.timestamp}</TableCell>
                                {transaction.status != "Refunded" && (
                                    <TableCell>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive">Refund</Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you absolutely sure to refund this transaction?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently refund your
                                                        transaction.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={async () => {
                                                        const res = await refund(transaction.transactionId, token);
                                                        if (!res.success) {
                                                            console.log("Failed to refund")
                                                        }
                                                        console.log("Successfully refund")
                                                        toast({
                                                                title: "Refunded",
                                                                description: "Refund successfully"
                                                            }
                                                        )
                                                        window.location.reload();
                                                    }}>REFUND</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))
                    ) : (
                        <></>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}