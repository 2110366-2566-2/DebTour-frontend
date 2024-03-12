"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MdOutlineStar } from "react-icons/md";
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

import { useEffect, useState } from "react";
import getTour from "@/lib/getTour";
import getTourImage from "@/lib/getTourImage";
import { Tour } from "@/app/tourist/tours/page";
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

const TourInfo = ({ params }: { params: { tourId: string } }) => {
  const [tour, setTour] = useState<Tour | null>(null);
  const [tourImage, setTourImage] = useState<{ tourId: number; images: string[] } | null>(null);
  useEffect(() => {
    async function waitForGetTour() {
      const t = await getTour(params.tourId);
      setTour(t.data);
      console.log(t.data);
    }
    async function waitForGetTourImage() {
      const i = await getTourImage(params.tourId);
      setTourImage(i.data);
      console.log(i.data);
    }
    waitForGetTour();
    waitForGetTourImage();
  }, []);
  return (
    <main>
      <section className="mb-32 h-[350px] bg-indigo-100">
        <div className="container relative h-full py-12 text-center">
          <h1 className=" my-6 text-5xl font-bold">{tour?.name}</h1>
          <p className="my-2 font-semibold text-indigo-700">
            Agency: {tour?.agencyUsername}
          </p>

          <div className="flex justify-center">
            <MdOutlineStar className="h-8 w-8 text-yellow-500" />
            <MdOutlineStar className="h-8 w-8 text-yellow-500" />
            <MdOutlineStar className="h-8 w-8 text-yellow-500" />
            <MdOutlineStar className="h-8 w-8 text-yellow-500" />
            <MdOutlineStarHalf className="h-8 w-8 text-yellow-500" />
          </div>

          <Link href={`/tourist/tours/join/${params.tourId}`}>
            <Button className="my-6">Join Tour</Button>
          </Link>

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
                  {formatDate(tour?.startDate)} - {formatDate(tour?.endDate)}
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
                <p className="font-bold">{formatDate(tour?.refundDueDate)}</p>
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
                tourImage?.images.map((image: string) => (
                  <CarouselItem>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <img
                            // the src is the base64 string of the image
                            className="h-full w-full rounded-xl object-fill"
                            src={`data:image/jpeg;base64,${image}`}
                            alt="tour image"
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
                      <img
                        // the src is the base64 string of the image
                        className="h-full w-full rounded-xl object-fill"
                        src="https://source.unsplash.com/600x600/?tour"
                        alt="tour image"
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
        {/* <p className="leading-8">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis
          expedita impedit sint excepturi quis reiciendis voluptas perferendis
          tempora distinctio eligendi corporis animi enim consectetur, et non
          iusto voluptatum maiores odio, nesciunt accusamus! Voluptatum
          expedita, nulla voluptates culpa cupiditate autem provident ipsum sit
          quos ducimus quis voluptatibus aspernatur perferendis tenetur dolor
          quibusdam! Non quis hic inventore illum atque, molestiae esse deserunt
          deleniti iste repellendus nulla, saepe error dolorem voluptatem est
          quasi laborum nisi provident ipsum illo excepturi. Alias itaque
          tenetur veritatis. Aliquam, distinctio expedita eos accusamus
          veritatis debitis blanditiis harum deleniti perferendis impedit sint
          dolor illum ducimus soluta numquam. Sint ut sapiente molestias
          consequuntur mollitia nisi, eos beatae, velit ipsa quia natus quaerat
          reiciendis eius suscipit exercitationem veniam iste sunt expedita nemo
          fugit aliquid placeat quos aspernatur. Ad voluptatem veritatis dicta
          quasi laboriosam ipsa laudantium nostrum doloribus eveniet, obcaecati
          voluptates sit perspiciatis, at minus in fugit ullam qui facere.
          Voluptate, deserunt sequi dolor ratione,
        </p> */}
      </section>
      <ReviewSection tourId={params.tourId} />
    </main>
  );
};

export default TourInfo;
