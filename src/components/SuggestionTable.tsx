"use client"
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Dialog} from "@/components/ui/dialog";

export default function SuggestionTable() {
    const {data: session, status, update} = useSession();
    const role = session?.user?.role;
    const token = session?.user?.serverToken;

    const suggestions = [
        {
            suggestionId: 1,
            description: "ZAZAZA Hanoi",
            suggestTimestamp: "2022-03-01T08:00:00.000Z",
            location: "Hanoi",
        },
        {
            suggestionId: 2,
            description: "ZAZAZA Hanoi",
            suggestTimestamp: "2022-03-01T08:00:00.000Z",
            location: "Hanoi 222",
        }
    ]


    const [reloading, setReloading] = useState(false);

    return (
        <>
            {
                reloading ? <div>Loading...</div> :
                    <div>
                        <Table>
                            <TableCaption>A list of your recent reported issues</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Suggestion ID</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Suggestion Time</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {suggestions.length && suggestions.map((suggestion) => (
                                    <TableRow key={suggestion.suggestionId + "table"} >
                                        <TableCell className="w-[50px]">{suggestion.suggestionId}</TableCell>
                                        <TableCell>{suggestion.description}</TableCell>
                                        <TableCell>{suggestion.location}</TableCell>
                                        <TableCell>{suggestion.suggestTimestamp}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

            }
        </>
    )
}