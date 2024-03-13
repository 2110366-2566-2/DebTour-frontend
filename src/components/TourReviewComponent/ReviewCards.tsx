import getReviewByTourId from "@/lib/getReviewByTourId";
import ReviewCard from "@/components/TourReviewComponent/ReviewCard";

export default async function ReviewCards({ tourId }: { tourId: string }) {
    // await new Promise((resolve) => setTimeout(resolve, 10000));
    const reviews = await getReviewByTourId(tourId).then((res) => res.data);
    return (
        <div className="mt-4 grid grid-flow-row-dense gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {
                (reviews != null && reviews.length > 0) ?
                    reviews.map((review: any, index: number) => (
                        <ReviewCard key={index} description={review.description} ratingScore={review.ratingScore} touristUsername={review.touristUsername} />
                    ))
                    :
                    <p>No reviews yet</p>
            }

            {/* <div className="col-span-full flex justify-center">
                    <button className="bg-primary rounded-md text-white px-4 py-2">Show all</button>
                </div> */}
        </div>
    )
}