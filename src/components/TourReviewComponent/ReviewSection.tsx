"use client";
import ReviewCards from "./ReviewCards";
import { Suspense, use, useEffect, useState } from "react";
import DialogReviewFormButton from "@/components/TourReviewComponent/DialogReviewFormButton";
import getReviewByTourId from "@/lib/getReviewByTourId";
export default function ReviewSection({ tourId }: { tourId: string }) {
  const [reviews, setReviews] = useState([]);

  async function getReviews() {
    getReviewByTourId(tourId)
      .then((res) => res.data)
      .then((res) => {
        setReviews(res);
      });
  }

  useEffect(() => {
    async function getReviews() {
      getReviewByTourId(tourId)
        .then((res) => res.data)
        .then((res) => {
          setReviews(res);
        });
    }

    getReviews();
  }, [tourId]);
  return (
    <div className="container mb-24 w-full">
      <div className="mb-12 flex items-center gap-8">
        <h1 className="text-3xl font-bold">Tour Reviews</h1>
        <DialogReviewFormButton tourId={tourId} callback={getReviews} />
      </div>
      <Suspense fallback={<p>Loading reviews...</p>}>
        <ReviewCards reviews={reviews} />
      </Suspense>
    </div>
  );
}
