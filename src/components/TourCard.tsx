/* eslint-disable @next/next/no-img-element */
import { Tour } from "@/app/tourist/tours/page";
import Link from "next/link";
import { GrMoney } from "react-icons/gr";
import { IoLocationOutline, IoPeopleOutline } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import { Button } from "./ui/button";
import TourCardEditButton from "./TourCardEditButton";
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
  return `${day}/${monthNames[monthIndex]}/${year}`;
};

interface Props {
  tour: Tour;
  isEditable: boolean;
}

const TourCard = ({ tour, isEditable }: Props) => {
  return (
    <div
      key={tour.tourId}
      className="
        m-4 grid grid-cols-[2fr,3fr] overflow-hidden rounded-3xl 
        border border-solid border-gray-200 bg-white shadow 
        duration-150 hover:scale-[1.03] hover:cursor-pointer
        h-56
      "
    >
      {
        (tour.FirstTourImage === null || tour.FirstTourImage === "No image")?
          <Image
            src={"/chiangrai-tower.webp"}
            alt="tour image"
            className="h-full w-full object-cover"
            width={200}
            height={200}
          />
        :
          <Image
            src={`data:image/jpeg;base64,${tour.FirstTourImage}`}
            alt="sample image"
            className="h-full w-full object-cover"
            width={200}
            height={200}
          />
      }
      

      <div className="px-8 py-6">
        <h2 className="mb-4 text-2xl font-bold">{tour.tourName}</h2>

        <div className="flex items-center">
          <IoLocationOutline className="m-1 h-4 w-4" />
          <span className="text-sm">{tour.overviewLocation}</span>
        </div>

        <div className="flex items-center">
          <LuCalendarDays className="m-1 h-4 w-4" />
          <span className="text-sm">
            {formatDate(tour.startDate)} - {formatDate(tour.endDate)}
          </span>
        </div>

        <div className="flex items-center">
          <IoPeopleOutline className="m-1 h-4 w-4" />
          <span className="text-sm">
            {tour.memberCount}/{tour.maxMemberCount} Members
          </span>
        </div>

        <div className="flex items-center">
          <GrMoney className="m-1 h-4 w-4" />
          <span className="text-sm">{tour.price} Baht</span>
        </div>

        <div className="flex justify-end">
          {isEditable && <TourCardEditButton tourId={tour.tourId} />}
        </div>
      </div>
    </div>
  );
};

export default TourCard;
