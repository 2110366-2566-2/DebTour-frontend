"use client";

import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
// import Image from "next/image";
import { useEffect, useState } from "react";
import { AgencyType } from "./agencyType";
import { dummyAgencies } from "./dummyAgencyData";
import AgencyCard from "./AgencyCard";

export default function AllRevenue() {
  const [agencies, setAgencies] = useState<AgencyType[]>();
  const { data: session } = useSession();

  // We use TanStack Query for real-time client data fetching.

  useEffect(() => {
    const fetchAllRevenue = async () => {
      try {
        const token = session?.user?.serverToken;
        const backendUrl = process.env.BACKEND_URL;
        const response = await axios.get(`${backendUrl}/api/v1/agencies`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAgencies(response.data.amount);
      } catch (err) {
        console.error("Error fetching revenue:", (err as AxiosError).message);
      }
    };

    if (session?.user?.serverToken && session?.user?.id) {
      fetchAllRevenue();
    }
  }, [session]);

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
          {/* {
            agencies.map((agency: AgencyType, index: number) => (
              <AgencyCard key={index} agency={agency} />
            ))} */}
        </div>
      </div>
    </main>
  );
}
