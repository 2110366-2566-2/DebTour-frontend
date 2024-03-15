"use client";
import ReviewCards from "./ReviewCards";
import { Suspense, use, useEffect, useState } from "react";
import DialogReviewFormButton from "@/components/DialogReviewFormButton";
import getReviewByTourId from "@/lib/getReviewByTourId";
export default function ReviewSection({ tourId }: { tourId: string }) {
    const [reviews, setReviews] = useState([]);
    async function getReviews() {
        getReviewByTourId(tourId).then((res) => res.data).then((res) => {
            setReviews(res);
        });
    }
    useEffect(() => {
        getReviews();
    }, [tourId]);
    return (
        <div className="w-full container mb-24">
            <div className="flex items-center gap-8 mb-12">
                <h1 className="text-3xl font-bold">Tour Reviews</h1>
                <DialogReviewFormButton tourId={tourId} callback={getReviews}/>
            </div>
            <Suspense fallback={<p>Loading reviews...</p>}>
                <ReviewCards reviews={reviews} />
            </Suspense>
        </div>
    );
}