import { Button } from "../ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import deleteTour from "@/lib/deleteTour";
import { toast } from "@/components/ui/use-toast";

import { useRouter } from 'next/navigation'
export default function DeleteBtn({tourId}: Readonly<{tourId: string}>) {
    const router = useRouter()
    
    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button className="rounded-full w-12 h-12 text-2xl bg-red-500 hover:bg-red-900">-</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the tour.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={async ()=>{
                            await deleteTour(tourId).then(
                                ()=>toast({title: "Failed to create tour", description: "Please try again",})
                            ).then(
                                ()=>router.push("/agency/tours")
                            )
                        }}>
                        Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}