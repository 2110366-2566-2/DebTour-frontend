import TourCard from "@/components/TourCard";
import TourSearchHeader from "@/components/TourSearchHeader";
import Link from "next/link";

export interface Tour {
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
  createdTimestamp: string;
}

const tours: { count: number; data: Tour[] } = {
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



const Tours = () => {
  return (
    <div className="">
      <TourSearchHeader
        heading={"Find your adventure"}
        imgPath={"/sea-bg.webp"}
      />

      <div className="bg-indigo-100 py-12">
        <div className="container grid grid-cols-2 justify-around ">
          {tours.data.map((tour: Tour) => (
            <Link href={`/tourist/tours/${tour.tourId}`} key={tour.tourId}>
              <TourCard tour={tour} isEditable={false} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tours;
