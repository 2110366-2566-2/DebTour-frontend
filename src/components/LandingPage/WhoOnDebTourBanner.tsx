import React from "react";
import Image from "next/image";

const WhoOnDebTourBanner = () => {
  return (
    <div>
      <p className="m-5">
        <span className="text-xl font-bold text-black md:text-3xl">
          Who is on{" "}
        </span>
        <span className="text-xl font-bold text-[#6366F1] md:text-3xl">
          DebTour
        </span>
        <span className="text-xl font-bold text-black md:text-3xl">?</span>
      </p>
      <div className="flex place-items-center justify-center">
        <div className="m-3">
          <p className="text-right">
            <span className="text-xl font-bold text-black md:text-3xl">
              Tourist
            </span>{" "}
            <br />
            <span className="text-sm text-black md:text-xl">
              Find interesting tours and
            </span>{" "}
            <br />
            <span className="text-sm text-black md:text-xl">have fun!</span>
          </p>
        </div>
        <div className="m-3">
          <Image
            src="/WhoOnDebTour.png"
            alt="WhoOnDebTour"
            width={200}
            height={200}
          />
        </div>
        <div className="m-3">
          <p>
            <span className="text-xl font-bold text-black md:text-3xl">
              Agency
            </span>{" "}
            <br />
            <span className="text-sm text-black md:text-xl">
              Post your tours and gain
            </span>{" "}
            <br />
            <span className="text-sm text-black md:text-xl">the profit!</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default WhoOnDebTourBanner;
