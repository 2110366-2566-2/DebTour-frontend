"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const CancelPayment = () => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        clearInterval(timer);
        window.location.href = "/tourist/tours";
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div className="">
      <div className="text-center">
        <h1 className="mb-10 mt-20 text-5xl font-extrabold">
          Payment Cancelled
        </h1>
        <p className="mb-3 text-xl font-bold">
          Your payment has been successfully cancelled
        </p>
        <p className="text-md">
          Feel free to take a look at other interesting tours
        </p>

        <Button className="mt-20">
          <Link href={"/tourist/tours"}>Back to tours page</Link>
        </Button>
        <p className="mt-4 text-sm text-gray-500">{`(redirect to tours page in ${countdown} seconds)`}</p>
      </div>

      <Image
        src={"/payment-response/undraw_cancel_re_pkdm.svg"}
        alt={""}
        width={200}
        height={200}
        className="mx-auto mt-20"
      />
    </div>
  );
};

export default CancelPayment;
