"use client";

import TourCard from "@/components/TourCard";
import TourSearchHeader from "@/components/TourSearchHeader";
import Link from "next/link";
import { useEffect, useState } from "react";
import FilterTour from "@/lib/FilterTour";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
  const [tours, setTour] = useState<Tour[]>([]);
  const [searchName, setSearchName] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [MemberCount, setMemberCount] = useState("");
  const [MinPrice, setMinPrice] = useState("");
  const [MaxPrice, setMaxPrice] = useState("");

  const { data: session, status } = useSession();

  useEffect(() => {
    async function waitForGetTour(
      searchName: string,
      StartDate: string,
      EndDate: string,
      MemberCount: string,
      MinPrice: string,
      MaxPrice: string,
      AgencyUsername: string,
    ) {
      const t = await FilterTour(
        searchName,
        StartDate,
        EndDate,
        MemberCount,
        MinPrice,
        MaxPrice,
        AgencyUsername,
      );
      setTour(t.data);
      console.log(t.data);
    }

    const delayDebounceFn = setTimeout(() => {
      console.log(searchName);
      console.log(StartDate);
      console.log(EndDate);
      console.log(MemberCount);
      console.log(MinPrice);
      console.log(MaxPrice);
      waitForGetTour(
        searchName,
        StartDate,
        EndDate,
        MemberCount,
        MinPrice,
        MaxPrice,
        session.user.id,
      );
      // Send Axios request here
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [
    searchName,
    StartDate,
    EndDate,
    MemberCount,
    MinPrice,
    MaxPrice,
    session.user.id,
  ]);

  return (
    // <div className="">
    //   <TourSearchHeader
    //     heading={"Manage Tours"}
    //     imgPath={"/header-agency.webp"}
    //   />

    //   <div className="bg-indigo-100 py-12">
    //     <div className="container grid grid-cols-2 justify-around ">
    //       {tours.data.map((tour: Tour) => (
    //         <Link href={`/tourist/tours/${tour.tourId}`} key={tour.tourId}>
    //           <TourCard tour={tour} isEditable />
    //         </Link>
    //       ))}
    //     </div>
    //   </div>
    // </div>
    // insert da same one as the tourist page

    <div className="">
      <TourSearchHeader
        heading={"Manage the adventure"}
        imgPath={"/sea-bg.webp"}
        setSearchName={setSearchName}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setMemberCount={setMemberCount}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
      />
      {/* need fixing */}
      {/* <TourSearchHeader
        heading={"Manage Tours"}
        imgPath={"/header-agency.webp"}
      /> */}

      <div className="bg-indigo-100 py-12">
        <div className="container grid grid-cols-2 justify-around ">
          {tours?.map((tour: Tour) => (
            <Link href={`/tourist/tours/${tour.tourId}`} key={tour.tourId}>
              <TourCard tour={tour} isEditable={true} />
            </Link>
          ))}
        </div>
      </div>

      <footer className="sticky bottom-0 bg-white px-6 py-3">
        <div className="flex items-center justify-end gap-4">
          <Label htmlFor="submitBtn" className="text-slate-400">
            Create new tour!
          </Label>
          <Link href={`/agency/tours/create`}>
            <Button
              id="submitBtn"
              type="submit"
              className="h-12 w-12 rounded-full text-2xl"
            >
              +
            </Button>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default ManageTour;
