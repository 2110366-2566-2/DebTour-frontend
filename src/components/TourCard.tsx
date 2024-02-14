/* eslint-disable @next/next/no-img-element */
import { Tour } from "@/app/tourist/tours/page";
import { GrMoney } from "react-icons/gr";
import { IoLocationOutline, IoPeopleOutline } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";

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
  return `${day}-${monthNames[monthIndex]}-${year}`;
};

const TourCard = ({ tour }: { tour: Tour }) => {
  return (
    <div
      key={tour.tourId}
      className="h-128 m-4 grid h-48 grid-cols-[2fr,3fr] rounded-xl border border-solid border-gray-200 bg-white shadow duration-150 hover:scale-105 hover:cursor-pointer"
    >
      {/* image */}

      <img
        src={
          "https://upload.wikimedia.org/wikipedia/commons/8/85/0020-%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%AA%E0%B8%B4%E0%B8%87%E0%B8%AB%E0%B9%8C%E0%B8%A7%E0%B8%A3%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3.jpg"
        }
        alt="tour image"
        className="h-full rounded-l-xl"
      />

      {/* Tour information */}
      <div className="px-8 py-1">
        <h2 className="mb-4 mt-4 text-2xl font-bold">{tour.name}</h2>

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
      </div>
    </div>
  );
};

export default TourCard;
