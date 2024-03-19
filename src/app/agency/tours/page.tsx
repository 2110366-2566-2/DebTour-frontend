import TourCard from "@/components/TourCard";
import TourSearchHeader from "@/components/TourSearchHeader";
import Link from "next/link";
import { Tour } from "@/app/tourist/tours/page";


const tours: { count: number; data: Tour[] } = {
  count: 5,
  data: [
    {
      tourId: 1,
      tourName: "Need fixing here",
      startDate: "2024-03-01T08:00:00.000Z",
      endDate: "2024-03-10T18:00:00.000Z",
      overviewLocation: "Mountain Range, XYZ Region",
      price: 15000,
      maxMemberCount: 20,
      memberCount: 0,
    },
  ],
};

const ManageTour = () => {
  return (
    <div className="">
      {/* need fixing */}
      {/* <TourSearchHeader
        heading={"Manage Tours"}
        imgPath={"/header-agency.webp"}
      /> */}

      <div className="bg-indigo-100 py-12">
        <div className="container grid grid-cols-2 justify-around ">
          {tours.data.map((tour: Tour) => (
            <Link href={`/tourist/tours/${tour.tourId}`} key={tour.tourId}>
              <TourCard tour={tour} isEditable />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageTour;
