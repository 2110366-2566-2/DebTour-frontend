import ReceiptDocument from "@/components/receiptDocument";
import getTransactionById from "@/lib/getTransactionById";

export default async function ReceiptPage({ params }: { params: { receiptId: string } }) {
    const transaction = await getTransactionById(params.receiptId).then((res) => res.data);
    // mock data
    // const transaction = {
    //     amount: 100,
    //     method: 'Credit Card',
    //     status: 'Success',
    //     stripeID: 'stripeID',
    //     timestamp: '2021-10-10',
    //     tourId: 1102,
    //     touristUsername: 'touristUsername',
    //     transactionId: 11102312,
    // };
    return (
        <ReceiptDocument transaction={transaction} />
    );
}
