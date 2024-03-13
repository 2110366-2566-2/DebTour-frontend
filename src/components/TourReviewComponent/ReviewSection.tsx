import CreateReviewForm from "@/components/TourReviewComponent/CreateReviewForm";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import ReviewCards from "./ReviewCards";
import { Suspense } from "react";
export default function ReviewSection({ tourId }: { tourId: string }) {
    return (
        <div className="w-full container mb-24">
            <div className="flex items-center gap-8 mb-12">
                <h1 className="text-3xl font-bold">Tour Reviews</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <button className="bg-foreground rounded-md text-primary-foreground px-4 py-2 hover:ring-4 ring-gray-300"
                        >Write a Review</button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create a Review</DialogTitle>
                            <DialogDescription>Share your experience with the tour</DialogDescription>
                        </DialogHeader>
                        <CreateReviewForm tourId={tourId} />
                        <DialogFooter>
                            {/* <Button type="submit">Save changes</Button> */}
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <Suspense fallback={<p>Loading reviews...</p>}>
                <ReviewCards tourId={tourId} />
            </Suspense>
        </div>
    );
}