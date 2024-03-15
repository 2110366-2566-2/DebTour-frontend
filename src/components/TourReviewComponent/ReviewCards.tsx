import getReviewByTourId from "@/lib/getReviewByTourId";
import ReviewCard from "@/components/TourReviewComponent/ReviewCard";
import { useEffect, useState } from "react";

export default async function ReviewCards({ reviews }: { reviews: any }) {
    const [maxLength, setMaxLength] = useState(8);
    return (
        <div className="mt-4 grid grid-flow-row-dense gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {
                (reviews != null && reviews.length > 0) ? (
                    (maxLength === -1)?
                    reviews.map((review: any, index: number) => (
                        <ReviewCard key={index} description={review.description} ratingScore={review.ratingScore} touristUsername={review.touristUsername} />
                    ))
                    :
                    reviews.slice(0, maxLength).map((review: any, index: number) => (
                        <ReviewCard key={index} description={review.description} ratingScore={review.ratingScore} touristUsername={review.touristUsername} />
                    ))
                )
                :
                <p>No reviews yet</p>
            }
            {
            (maxLength !== -1) && (
            <div className="col-span-full flex justify-center">
                {maxLength < reviews.length && (
                    <button className="bg-primary rounded-md text-white px-4 py-2"
                        onClick={() => {
                            setMaxLength(-1);
                        }}
                    >Show all</button>
                )}
            </div>)
            }
        </div>
    )
}