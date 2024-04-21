"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const SuccessPayment = () => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        clearInterval(timer);
        window.location.href = "/";
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div className="">
      <div className="text-center">
        <h1 className="mb-10 mt-20 text-5xl font-extrabold">
          Payment Successful
        </h1>
        <p className="mb-3 text-xl font-bold">
          Thank you for choosing <u className="text-primary">DebTour</u>
        </p>
        <p className="text-md">
          We appreciate your trust in our platform to facilitate your travel
          experiences and bookings.
        </p>

        <Button className="mt-20">
          <Link href={"/"}>Back to home</Link>
        </Button>
        <p className="mt-4 text-sm text-gray-500">{`(redirect to homepage in ${countdown} seconds)`}</p>
      </div>

      <Image
        src={"/payment-response/undraw_travel_mode_re_2lxo.svg"}
        alt={""}
        width={300}
        height={300}
        className="mx-auto mt-20"
      />
    </div>
  );
};

export default SuccessPayment;
