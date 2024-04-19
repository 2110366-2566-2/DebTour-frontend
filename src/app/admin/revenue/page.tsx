"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
// import Image from "next/image";
import { AgencyType } from "./agencyType";
import { dummyAgencies } from "./dummyAgencyData";
import AgencyCard from "./AgencyCard";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function AllRevenue() {
  const { data: session } = useSession();

  // We use TanStack Query for real-time client data fetching.
  const getAllAgencies = async (): Promise<AgencyType[]> => {
    const token = session?.user?.serverToken;
    const backendUrl = process.env.BACKEND_URL;
    const response = await axios.get(`${backendUrl}/api/v1/agencies`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const {
    data: agencies,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getAllAgencies(),
    queryKey: ["agencies"],
  });

  if (isLoading) {
    return (
      <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        <Loader2 className="mx-auto h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] font-bold text-red-500">
        Error: {error.message}
      </p>
    );
  }

  return (
    <main>
      <div className="container">
        <h1 className="mb-20 mt-10 text-center text-4xl font-bold">
          Agency Revenue Board
        </h1>

        <div className="grid grid-cols-3 gap-6">
          {/* test layout with dummy data */}
          {dummyAgencies.map((agency: AgencyType, index: number) => (
            <AgencyCard key={index} agency={agency} />
          ))}

          {/* real data */}
          {agencies &&
            agencies.map((agency: AgencyType, index: number) => (
              <AgencyCard key={index} agency={agency} />
            ))}
        </div>
      </div>
    </main>
  );
}
