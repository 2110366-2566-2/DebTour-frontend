/* eslint-disable @next/next/no-img-element */
import { CiSearch } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { IoLocationOutline } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import { IoPeopleOutline } from "react-icons/io5";
import { GrMoney } from "react-icons/gr";

//dummy tour list
const tourList = {
  count: 5,
  data: [
    {
      tourId: 9,
      name: "Mountain Trek Expedition",
      startDate: "2024-03-01T08:00:00.000Z",
      endDate: "2024-03-10T18:00:00.000Z",
      description:
        "Embark on an adventurous trek through breathtaking mountain trails.",
      overviewLocation: "Mountain Range, XYZ Region",
      price: 15000,
      refundDueDate: "2024-02-20T23:59:59.000Z",
      maxMemberCount: 20,
      memberCount: 0,
      status: "Available",
      agencyUsername: "adventure_tours",
      createdTimestamp: "2024-02-13T09:15:00.000Z",
    },
    {
      tourId: 10,
      name: "City Nightlife Tour",
      startDate: "2024-02-25T18:00:00.000Z",
      endDate: "2024-02-26T02:00:00.000Z",
      description:
        "Experience the vibrant nightlife of the city with guided tours and club hopping.",
      overviewLocation: "Downtown, CityName",
      price: 8000,
      refundDueDate: "2024-02-20T23:59:59.000Z",
      maxMemberCount: 30,
      memberCount: 0,
      status: "Available",
      agencyUsername: "nightlife_experts",
      createdTimestamp: "2024-02-13T09:30:00.000Z",
    },
    {
      tourId: 11,
      name: "Historical Walking Tour",
      startDate: "2024-03-05T10:00:00.000Z",
      endDate: "2024-03-05T14:00:00.000Z",
      description:
        "Explore the rich history and architecture of the city's landmarks.",
      overviewLocation: "Old Town District, CityName",
      price: 5000,
      refundDueDate: "2024-02-20T23:59:59.000Z",
      maxMemberCount: 25,
      memberCount: 0,
      status: "Available",
      agencyUsername: "history_walks_inc",
      createdTimestamp: "2024-02-13T10:00:00.000Z",
    },
    {
      tourId: 12,
      name: "Beach Day Escape",
      startDate: "2024-03-15T09:00:00.000Z",
      endDate: "2024-03-15T17:00:00.000Z",
      description:
        "Relax and unwind on the sunny beaches with various water activities.",
      overviewLocation: "Sandy Shores Beach, Coastal Area",
      price: 10000,
      refundDueDate: "2024-02-25T23:59:59.000Z",
      maxMemberCount: 40,
      memberCount: 0,
      status: "Available",
      agencyUsername: "beach_getaways",
      createdTimestamp: "2024-02-13T10:30:00.000Z",
    },
    {
      tourId: 13,
      name: "Cultural Cuisine Tour",
      startDate: "2024-03-10T12:00:00.000Z",
      endDate: "2024-03-10T16:00:00.000Z",
      description:
        "Indulge in a culinary journey exploring diverse local cuisines and flavors.",
      overviewLocation: "Food District, CityName",
      price: 7500,
      refundDueDate: "2024-02-28T23:59:59.000Z",
      maxMemberCount: 15,
      memberCount: 0,
      status: "Available",
      agencyUsername: "taste_explorers",
      createdTimestamp: "2024-02-13T11:00:00.000Z",
    },
  ],
};

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

const Tours = () => {
  return (
    <div>
      <div className="bg-[#E0E7FF]">
        <h1 className="text-xl font-bold text-black">Tour List</h1>

        <div>
          <div className="flex w-full">
            <div className="flex w-2/4 items-center">
              <CiSearch className="h-6 w-6" />
              <Input type="text" placeholder="Tour Name" />
            </div>

            <div className="flex w-2/4 items-center">
              <IoLocationOutline className="h-6 w-6" />
              <Input type="text" placeholder="Location" />
            </div>
          </div>
          {/* the second one */}
          <div className="flex">
            <div className="flex items-center">
              <LuCalendarDays className="h-12 w-12" />
              <Input type="date" placeholder="Start Date" />
              <Input type="date" placeholder="End Date" />
            </div>
            <div className="flex items-center">
              <IoPeopleOutline className="h-6 w-6" />
              <Input type="number" placeholder="Number of Member" />
            </div>
            <div className="flex items-center">
              <GrMoney className="h-12 w-12" />
              <Input type="number" placeholder="Min Price" />
              <Input type="number" placeholder="Max Price" />
            </div>
          </div>
        </div>
      </div>
      {/* the searched component */}
      {/* justify content space between */}
      <div className="flex flex-wrap justify-around">
        {/* Map the tour list */}
        {tourList.data.map((tour) => (
          // <div key={tour.tourId} className="m-4 w-1/3 bg-white p-4">
          //   <div>
          //     <p>name: {tour.name}</p>
          //     <p>start date: {tour.startDate}</p>
          //     <p>end date: {tour.endDate}</p>
          //     <p>description: {tour.description}</p>
          //     <p>overview location: {tour.overviewLocation}</p>
          //     <p>price: {tour.price}</p>
          //     <p>refund due date: {tour.refundDueDate}</p>
          //     <p>max member count: {tour.maxMemberCount}</p>
          //     <p>member count: {tour.memberCount}</p>
          //     <p>status: {tour.status}</p>
          //     <p>agency username: {tour.agencyUsername}</p>
          //     <p>created timestamp: {tour.createdTimestamp}</p>
          //   </div>
          // </div>
          <div
            key={tour.tourId}
            className="h-128 m-4 flex h-64 w-2/5 rounded-xl border border-solid border-gray-200 bg-white hover:cursor-pointer"
          >
            {/* image */}
            <div>
              <img
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/8/85/0020-%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%AA%E0%B8%B4%E0%B8%87%E0%B8%AB%E0%B9%8C%E0%B8%A7%E0%B8%A3%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3.jpg"
                }
                alt="tour image"
                className="h-full w-56 rounded-l-xl"
              />
            </div>
            {/* Tour information */}
            <div className="m-3">
              <p className="text-2xl font-bold">{tour.name}</p>
              <p className="flex items-center">
                <IoLocationOutline className="m-1 h-6 w-6" />
                <span className="text-md">{tour.overviewLocation}</span>
              </p>
              <p className="flex items-center">
                <LuCalendarDays className="m-1 h-6 w-6" />
                <span className="text-md">
                  {formatDate(tour.startDate)} - {formatDate(tour.endDate)}
                </span>
              </p>
              <p className="flex items-center">
                <IoPeopleOutline className="m-1 h-6 w-6" />
                <span className="text-md">
                  {tour.memberCount}/{tour.maxMemberCount} Members
                </span>
              </p>
              <p className="flex items-center">
                <GrMoney className="m-1 h-6 w-6" />
                <span className="text-md">{tour.price} Baht</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tours;
