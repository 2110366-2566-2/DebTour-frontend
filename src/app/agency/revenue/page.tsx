"use client";

import Image from "next/image";
import CountUp from "react-countup";
import { Loader2 } from "lucide-react";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios, { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

const AgencyRevenue = () => {
  const { data: session } = useSession();

  async function getAgencyRevenue() {
    const token = session?.user?.serverToken;
    const username = session?.user?.id;
    const backendUrl = process.env.BACKEND_URL;

    const res = await axios.get(
      `${backendUrl}/api/v1/agencies/getRevenue/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data.amount;
  }

  // We use TanStack Query for real-time client data fetching.
  const {
    data: agencyRevenue,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => getAgencyRevenue(),
    queryKey: ["agencyRevenue"],
  });

  if (isLoading) {
    return <Loader2 className="mx-auto h-8 w-8 animate-spin" />;
  }

  if (isError) {
    return <div className="text-center text-red-500">Error fetching data</div>;
  }

  return (
    <main className="relative min-h-[calc(100vh-60px)] text-center">
      <div className="pt-20">
        <p className="text-sm font-bold uppercase sm:text-lg">
          current revenue
        </p>
        <div className="absolute left-[50%] my-2 h-[3px] w-20 translate-x-[-50%] bg-violet-500" />

        <div className="mt-8 text-5xl font-extrabold md:text-6xl">
          <CountUp end={agencyRevenue} decimals={2} /> ฿
        </div>
      </div>

      <Image
        src={"/get-revenue.svg"}
        width={400}
        height={400}
        alt="get your revenue via email"
        className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
      />

      <div className="absolute bottom-20 left-[50%] translate-x-[-50%]">
        <p className="text-sm text-gray-500">
          Please contact the administrator to get your revenue via
        </p>
        <p className="mt-4 text-base font-extrabold sm:text-lg md:text-2xl">
          contact@debtourofficial.com
        </p>

        <div className="absolute left-[50%] my-2 h-[3px] w-32 translate-x-[-50%] bg-violet-500" />
      </div>
    </main>
  );
};

export default AgencyRevenue;
