import TransactionHistoryTable from "@/components/TransactionHistoryTable";

export default function TransactionHistory() {
    return (
        <div className="container flex flex-col gap-6 w-1/2">
            <div className="flex justify-between mt-10">
                <h1 className="text-2xl font-semibold">My Transaction History</h1>
            </div>
            <div className="flex justify-center">
                <TransactionHistoryTable/>
            </div>
        </div>
    )
}