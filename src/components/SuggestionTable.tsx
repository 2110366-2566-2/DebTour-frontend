"use client"
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Dialog} from "@/components/ui/dialog";
import getAllSuggestions from "@/lib/getAllSuggestions";

export default function SuggestionTable() {
    const {data: session, status, update} = useSession();
    const role = session?.user?.role;
    const token = session?.user?.serverToken;

    const [suggestions, setSuggestions] = useState([] as any[]);

    useEffect(() => {
        async function get() {
            setReloading(true)
            const res = await getAllSuggestions(token);
            if (!res) return
            let temp = []
            for (let i = 0; i < res.data.length; i++) {
                // parse date
                let suggestTime = new Date(res.data[i].suggestTimestamp);
                let suggestTimeStr = suggestTime.toLocaleString();

                temp.push({
                    suggestionId: res.data[i].suggestionId,
                    description: res.data[i].description,
                    suggestTimestamp: suggestTimeStr,
                    location: res.data[i].location
                });
            }
            console.log(temp)
            setSuggestions(temp)
            setReloading(false)
        }

        get()
    }, [token]);

    const [reloading, setReloading] = useState(false);

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Suggestion ID</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Suggestion Time</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {suggestions.length > 0 && suggestions.map((suggestion) => (
                        <TableRow key={suggestion.suggestionId + "table"}>
                            <TableCell className="w-[50px]">{suggestion.suggestionId}</TableCell>
                            <TableCell>{suggestion.description}</TableCell>
                            <TableCell>{suggestion.location.name}</TableCell>
                            <TableCell>{suggestion.suggestTimestamp}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}