import CreateReviewForm from "@/components/TourReviewComponent/CreateReviewForm";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useState } from "react";

const wait = () => new Promise((resolve) => setTimeout(resolve, 500));

export default function DialogReviewFormButton({tourId, callback}: {tourId: string, callback: Function}) {
    const [open, setOpen] = useState(false);
    async function submitCallback(){
        setOpen(false);
        wait().then(() => {
            callback();
        });
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="bg-foreground rounded-md text-primary-foreground px-4 py-2 hover:ring-4 ring-gray-300"
                >Write a Review</button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create a Review</DialogTitle>
                    <DialogDescription>Share your experience with the tour</DialogDescription>
                </DialogHeader>
                <CreateReviewForm tourId={tourId} 
                    submitCallback={submitCallback}
                />
                <DialogFooter>
                    {/* <Button type="submit">Save changes</Button> */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}