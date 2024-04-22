"use client";

import TourCard from "@/components/TourCard";
import { Input } from "@/components/ui/input";
import FilterTour from "@/lib/FilterTour";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface Tour {
  tourId: number;
  tourName: string;
  startDate: string;
  endDate: string;
  overviewLocation: string;
  memberCount: number;
  maxMemberCount: number;
  price: number;
  FirstTourImage: string;
}

interface SearchParamsType {
  tours: Tour[];
  searchName: string;
  startDate: string;
  endDate: string;
  yourTotalMembers: string;
  minPrice: string;
  maxPrice: string;
  agencyUsername: string;
}

const Tours = () => {
  const [searchParams, setSearchParams] = useState<SearchParamsType>({
    tours: [],
    searchName: "",
    startDate: "",
    endDate: "",
    yourTotalMembers: "",
    minPrice: "",
    maxPrice: "",
    agencyUsername: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const {
    searchName,
    startDate,
    endDate,
    yourTotalMembers,
    minPrice,
    maxPrice,
    agencyUsername,
  } = searchParams;

  useEffect(() => {
    const fetchTours = async () => {
      setIsLoading(true);

      const filteredTours = await FilterTour(
        searchName,
        startDate,
        endDate,
        yourTotalMembers,
        minPrice,
        maxPrice,
        agencyUsername,
      );
      setSearchParams((prevSearchParams) => ({
        ...prevSearchParams,
        tours: filteredTours,
      }));

      setIsLoading(false); // Set loading state to false after fetching
    };

    fetchTours();
  }, [
    searchName,
    startDate,
    endDate,
    yourTotalMembers,
    minPrice,
    maxPrice,
    agencyUsername,
  ]);

  const handleInputChange = (key: string, value: string) => {
    setSearchParams({ ...searchParams, [key]: value });
  };

  return (
    <div className="">
      <div
        className="mx-auto mb-12 mt-10 h-[400px] max-w-[1300px] rounded-[36px] bg-indigo-100 object-cover py-12"
        style={{
          backgroundImage: `url("/sea-bg.webp")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="mb-10 text-center text-[54px] font-extrabold capitalize text-white drop-shadow">
          Find your adventure
        </h1>

        <div className="mx-auto grid max-w-[800px] grid-cols-5 gap-x-2 gap-y-8">
          <Input
            className="col-span-5 rounded-2xl"
            placeholder="Search your destination or tour name"
            onChange={(e) => handleInputChange("searchName", e.target.value)}
          />

          <Input
            type="text"
            className="rounded-md"
            placeholder="Start date"
            onChange={(e) => handleInputChange("startDate", e.target.value)}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />

          <Input
            type="text"
            className="rounded-md"
            placeholder="End date"
            onChange={(e) => handleInputChange("endDate", e.target.value)}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />

          <Input
            placeholder="Your total members"
            onChange={(e) =>
              handleInputChange("yourTotalMembers", e.target.value)
            }
          />

          <Input
            placeholder="Minimum price"
            onChange={(e) => handleInputChange("minPrice", e.target.value)}
          />

          <Input
            placeholder="Maximum price"
            onChange={(e) => handleInputChange("maxPrice", e.target.value)}
          />
        </div>
      </div>

      <div className="min-h-[500px] bg-indigo-100 py-12">
        {isLoading && <Loader2 className="mx-auto h-10 w-10 animate-spin" />}

        {!isLoading && searchParams.tours.length === 0 && (
          <p className="text-center">No search result</p>
        )}

        <div className="container grid grid-cols-none justify-around md:grid-cols-2">
          {searchParams.tours.map((tour: Tour) => (
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
