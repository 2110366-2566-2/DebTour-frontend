"use client";

import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import getTransactionHistory from "@/lib/getTransactionHistory";
import {Button} from "@/components/ui/button";

export default function TransactionHistoryTable() {
    const { data: session, status, update } = useSession();
    const role = session?.user?.role;
    const username = session?.user?.id;
    const token = session?.user?.serverToken;

    const [transactionHistory, setTransactionHistory] = useState([] as any[])

    useEffect(() => {
        async function get() {
            let res = await getTransactionHistory(username, token);
            res.data = [{
                amount: 2500,
                method: "Mobile Banking",
                status: "success",
                timestamp: "2024-03-27T14:34:34.924747Z",
                tourId: 0,
                transactionId: 0
            }]
            // if (!res) return;
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
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactionHistory.length? (
                        transactionHistory.map((transaction) => (
                            <TableRow
                                key={transaction.transactionId}
                            >
                                <TableCell className={"w-[50px]"}>{transaction.transactionId}</TableCell>
                                <TableCell className="w-[50px]">{transaction.tourId}</TableCell>
                                <TableCell className="w-[100px]">{transaction.method}</TableCell>
                                <TableCell className="w-[100px]">{transaction.amount}</TableCell>
                                <TableCell className="w-[100px]">{transaction.status}</TableCell>
                                <TableCell className="w-[120px] text-xs">{transaction.timestamp}</TableCell>
                                <TableCell>
                                    <Button>
                                        Refund
                                    </Button>
                                </TableCell>
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