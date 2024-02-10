import React from "react";
import Image from "next/image";

const LandingBanner = () => {
  return (
    <div className="flex w-full flex-row place-items-center justify-center gap-5 bg-[#E0E7FF]">
      {/* Left */}
      <div className="m-5 flex justify-center">
        <p>
          <span className="text-7xl font-bold text-black">Explore </span>
          <span className="text-7xl font-bold text-[#6366F1]">100+</span>
          <br />
          <span className="text-7xl font-bold text-[#6366F1]">Tour </span>
          <span className="text-sm font-bold text-black md:text-7xl">in </span>
          <span className="text-7xl font-bold text-[#6366F1]">DebTour</span>
          <br />
          <br />
          <span className="text-xl text-black">
            The platform for tourist that finding high quality tour
          </span>
        </p>
      </div>
      {/* Right */}
      <div className="m-5">
        <Image
          src="/LandingPage-Minimap.png"
          alt="landing"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default LandingBanner;
