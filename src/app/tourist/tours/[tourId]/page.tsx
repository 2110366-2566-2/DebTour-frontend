import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";
import { MdOutlineStarHalf } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import { MdCalendarMonth } from "react-icons/md";
import { GrMoney } from "react-icons/gr";
import { MdPeople } from "react-icons/md";
import { RiRefund2Line } from "react-icons/ri";
import { GoGoal } from "react-icons/go";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IoLocationOutline } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import { IoPeopleOutline } from "react-icons/io5";

import getTour from "@/lib/getTour";
import getTourImage from "@/lib/getTourImage";
import Image from "next/image";
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${day} ${monthNames[monthIndex]} ${year}`;
};

const formatTimeSchedule = (StartTime: string, EndTime: string) => {
  const StartDate = new Date(StartTime);
  const EndDate = new Date(EndTime);
  const time = `${StartDate.getHours().toString().padStart(2, "0")}:${StartDate.getMinutes().toString().padStart(2, "0")} - ${EndDate.getHours().toString().padStart(2, "0")}:${EndDate.getMinutes().toString().padStart(2, "0")}`;
  const StartDateString = formatDate(StartTime);
  const EndDateString = formatDate(EndTime);
  return `${StartDateString} - ${EndDateString}`;
};

export interface Location {
  locationId: number;
  name: string;
  latitude: number;
  longitude: number;
  type: string;
  address: string;
}

export interface Activity {
  tourId: number;
  activityId: number;
  name: string;
  description: string;
  startTimestamp: string;
  endTimestamp: string;
  location: Location;
}
import ReviewSection from "@/components/TourReviewComponent/ReviewSection";
import getTourAvgRating from "@/lib/getTourAvgRating";
import getTours from "@/lib/getTours";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth/next";

type Tour = {
  tourId: number;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  overviewLocation: string;
  price: number;
  refundDueDate: string;
  maxMemberCount: number;
  memberCount: number;
  status: string;
  agencyUsername: string;
  activities: Activity[];
  AgencyName: string;
};

export default async function TourInfo({ params }: { params: { tourId: string } }){
  const session = await getServerSession(authOptions);
  const tour = await getTour(params.tourId).then((res) => res.data) as Tour;
  const tourImage = await getTourImage(params.tourId).then((res) => res.data);
  const tourAvgRating = await getTourAvgRating(params.tourId).then((res) => {
    if(res.success==false) return null
    if(res.data==null || res.data==0) return null
    return Math.round(res.data*2)/2
  });
  return (
    <main>
      <section className="mb-32 h-[350px] bg-indigo-100">
        <div className="container relative h-full py-12 text-center">
          <h1 className=" my-6 text-5xl font-bold">{tour?.name}</h1>
          <p className="my-2 font-semibold text-indigo-700">
            Agency: {tour?.AgencyName}
          </p>
          <div className="flex justify-center">
            {
            tourAvgRating != null ? 
            tourAvgRating>0?
            (
              <> 
                {[...Array(Math.floor(tourAvgRating))].map((_, i) => (
                  <MdOutlineStar className="h-8 w-8 text-yellow-500" key={i} />
                ))}
                {tourAvgRating % 1 != 0 ? (
                  <MdOutlineStarHalf className="h-8 w-8 text-yellow-500" />
                ) : (
                  ""
                )}
                {[...Array(5 - Math.ceil(tourAvgRating))].map((_, i) => (
                  <MdOutlineStarBorder className="h-8 w-8 text-yellow-500" key={i} />
                ))}
              </>
            ):
            <>
              <span className="text-gray-500">No Rating Yet</span>
            </>:""
            }
          </div>
          {
            (session?.user?.role!="Agency" && session?.user?.role!="Admin")?
              (tour?.memberCount<tour?.maxMemberCount)?
                <Link href={`/tourist/tours/join/${params.tourId}`}>
                  <Button className="my-6">Join Tour</Button>
                </Link>
                :
                <Button className="my-6 bg-gray-600" disabled>Join Tour</Button>
                :
                null
          }

          <div className="absolute bottom-[-50px] left-0 right-0 mx-auto flex h-[100px] max-w-[1000px] items-center justify-evenly gap-2  rounded-2xl bg-white shadow-xl">
            <div className="grid max-w-[200px] grid-cols-[30px,1fr] items-center gap-3">
              <MdLocationOn className="h-7 w-7 rounded-full p-1 shadow-lg" />
              <div className="text-left text-xs">
                <p className="text-gray-500">Overview Location</p>
                <p className="font-bold">{tour?.overviewLocation}</p>
              </div>
            </div>

            <div className="grid max-w-[300px] grid-cols-[30px,1fr] items-center gap-3">
              <MdCalendarMonth className="h-7 w-7 rounded-full p-1 shadow-lg" />
              <div className="text-left text-xs">
                <p className="text-gray-500">Duration</p>
                <p className="font-bold">
                  {formatDate(tour?.startDate??'')} - {formatDate(tour?.endDate??'')}
                </p>
              </div>
            </div>

            <div className="grid max-w-[200px] grid-cols-[30px,1fr] items-center gap-3">
              <GrMoney className="h-7 w-7 rounded-full p-1 shadow-lg" />
              <div className="text-left text-xs">
                <p className="text-gray-500">Price</p>
                <p className="font-bold">{tour?.price}</p>
              </div>
            </div>

            <Link href={`/tourist/tours/member/${params.tourId}`}>
              <div className="grid max-w-[200px] grid-cols-[30px,1fr] items-center gap-3">
                <MdPeople className="h-7 w-7 rounded-full p-1 shadow-lg" />
                <div className="text-left text-xs">
                  <p className="text-gray-500">Members</p>
                  <p className="font-bold">
                    {tour?.memberCount} / {tour?.maxMemberCount}
                  </p>
                </div>
              </div>
            </Link>

            <div className="grid max-w-[200px] grid-cols-[30px,1fr] items-center gap-3">
              <RiRefund2Line className="h-7 w-7 rounded-full p-1 shadow-lg" />
              <div className="text-left text-xs">
                <p className="text-gray-500">Refund Due Date</p>
                <p className="font-bold">{formatDate(tour?.refundDueDate??'')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mb-24">
        <h2 className="mb-12 text-3xl font-bold">Tour Information</h2>

        <div className="mx-auto grid max-w-[1200px] grid-cols-2">
          <Carousel className="w-full max-w-sm">
            <CarouselContent>
              {
              tourImage!=null && tourImage.images!=null?(
                tourImage?.images.map((image: string, index: number) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <Image
                            // the src is the base64 string of the image
                            className="h-full w-full rounded-xl object-fill"
                            src={`data:image/jpeg;base64,${image}`}
                            alt="tour image"
                            width={0} height={0}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))
              ):(<CarouselItem>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <Image
                        // the src is the base64 string of the image
                        className="h-full w-full rounded-xl object-fill"
                        src="/header-agency.webp"
                        alt="tour image"
                        width={0} height={0}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>)}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <p className="leading-8">{tour?.description}</p>
        </div>
      </section>

      <section className="container mb-24">
        <h2 className="mb-12 text-3xl font-bold">Tour Activities</h2>
        <div className="container grid grid-cols-3 justify-around">
          {tour?.activities.map((activity: Activity, index: number) => (
            <Link
              href={`http://maps.google.com/maps?q=${activity.location.latitude},${activity.location.longitude}`}
              key={activity.activityId}
            >
              <div
                key={activity.activityId}
                className="relative m-4 h-[max-content] overflow-hidden rounded-3xl border border-solid border-gray-200 bg-indigo-100 shadow duration-150 hover:scale-[1.03] hover:cursor-pointer"
              >
                <div className="px-8 py-6">
                  <h2 className="mb-4 text-2xl font-bold">
                    {index + 1} {activity.name}
                  </h2>

                  <div className="flex items-center">
                    <GoGoal className="m-1 h-4 w-4" />
                    <span className="text-sm">{activity.description}</span>
                  </div>

                  <div className="flex items-center">
                    <IoLocationOutline className="m-1 h-4 w-4" />
                    <span className="text-sm">
                      {activity.location.name} @ {activity.location.address}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <LuCalendarDays className="m-1 h-4 w-4" />
                    <span className="text-sm">
                      {formatTimeSchedule(
                        activity.startTimestamp,
                        activity.endTimestamp,
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {/* <Link href={`/tourist/tours/${tour.tourId}`} key={tour.tourId}>
            <TourCard tour={tour} isEditable={false} />
          </Link> */}
        </div>
      </section>
      <ReviewSection tourId={params.tourId} />
    </main>
  );
};
// This function gets called at build time
export async function generateStaticParams() {
  try {
    const tours = await getTours();
    if (!tours || !tours.data) {
        throw new Error("Failed to fetch tour data");
    }
    const paths = tours.data.map((tour: any) => ({
        tourId: `${tour.tourId}`,
    }));
    // console.log(paths)
    return paths;
  } catch (error) {
      console.error("Error generating static paths:", error);
      return []; // Return an empty array to prevent build errors
  }
}
export const dynamicParams = false
export const revalidate = 60