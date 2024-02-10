import React from "react";
import Image from "next/image";

const WhoOnDebTourBanner = () => {
  return (
    <div>
      <p className="m-5">
        <span className="text-3xl font-bold text-black">Who's on </span>
        <span className="text-3xl font-bold text-[#6366F1]">DebTour</span>
      </p>
      <div className="flex place-items-center justify-center">
        <div className="m-3">
          <p className="text-right">
            <span className="text-3xl font-bold text-black">Tourist</span>{" "}
            <br />
            <span className="text-xl text-black">
              Find interesting tours and
            </span>{" "}
            <br />
            <span className="text-xl text-black">have fun!</span>
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
            <span className="text-3xl font-bold text-black">Agency</span> <br />
            <span className="text-xl text-black">
              Post your tours and gain
            </span>{" "}
            <br />
            <span className="text-xl text-black">the profit!</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default WhoOnDebTourBanner;
