"use client";
import { Document, Page, Text, View, StyleSheet, Svg, Path } from '@react-pdf/renderer';
import dynamic from "next/dynamic";
import { SiYourtraveldottv } from 'react-icons/si';
import {createElement} from 'react';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';

const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    {
        ssr: false,
        loading: () => <p className='mx-auto'>Loading...</p>
    },
);

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 30
    },
    section: {
        flexGrow: 1
    },
    header: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
        fontSize: 10
    },
    listHeader: {
        fontWeight: 'extrabold',
        fontStyle: 'bold',
        fontSize: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#888888',
        paddingVertical:15
    },
    listItem: {
        fontSize: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#666666',
        paddingVertical:10,
        color: '#383838'
    },
    listItemBottom: {
        fontSize: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#666666',
        paddingVertical:10,
        marginBottom:30,
        color: '#383838'
    }
});

type Transaction = {
    amount: number;
    method: string;
    status: string;
    stripeID: string;
    timestamp: string;
    tourId: number;
    touristUsername: string;
    transactionId: number;
}

export default function ReceiptDocument({ transaction }: { transaction: Transaction }) {
    const { data: session, status } = useSession();
    const path = SiYourtraveldottv({ size: 100 }).props.children[0].props.d;
    const Icon = createElement(
        'path',
        { d: path }
    )
    return (
        <div className='container mx-auto h-dvh'>
            <PDFViewer width="100%" height="100%">
                <Document title={`Receipt {receiptId}`}>
                    <Page size="A4" style={styles.page}>
                        <View style={styles.top}>
                            <Text>This is your receipt</Text>
                        </View>
                        <View style={{flexDirection:'row', alignItems:'center', marginBottom:30}}>
                            <View style={styles.header}>
                                <Svg width={60} height={60} viewBox='0 0 30 30'>
                                    <Path d={path} fill="#515B6F"/>
                                </Svg>
                                <Text style={{fontSize: 30, fontWeight:'extrabold'}}>DebTour</Text> {/*className="text-xl font-semibold"*/}
                            </View>
                            <View style={{flexGrow:1,justifyContent:'flex-end',flexDirection:'row'}}>
                                <View style={{flexDirection:'column', alignItems:'flex-end'}}>
                                    <Text>Transaction ID:</Text>
                                    <Text style={{color: '#383838'}}>{transaction.transactionId}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.listHeader}>Your Details</Text>
                            <Text style={styles.listItem}>Name: {session?.user.name}</Text>
                            <Text style={styles.listItemBottom}>Email: {session?.user.email}</Text>

                            <Text style={styles.listHeader}>Transaction Details</Text>
                            <Text style={styles.listItem}>Date: {format(new Date(), 'dd MMM yyyy')}</Text>
                            <Text style={styles.listItem}>Method: {transaction.method}</Text>
                            <Text style={styles.listItem}>Amount: {transaction.amount}</Text>
                            {/* <Text style={styles.listItem}>Status: {transaction.status}</Text> */}
                            <Text style={styles.listItem}>Tour ID: {transaction.tourId}</Text>
                            <Text style={styles.listItemBottom}>Stripe ID: {transaction.stripeID}</Text>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    );
} 