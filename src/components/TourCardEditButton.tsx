'use client'
import Link from "next/link";
import { Button } from "./ui/button";

export default function TourCardEditButton({tourId}: {tourId: number}) {
    return (
        
            <Link href={`/agency/tours/edit/${tourId}`} passHref legacyBehavior>
                <Button onClick={e => e.stopPropagation()} variant="outline">
                    Edit
                </Button>
            </Link>
    );
}