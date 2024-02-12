import React from "react";
import Image from "next/image";

const LandingBanner = () => {
  return (
    <div className="flex w-full flex-row place-items-center justify-center gap-5 bg-[#E0E7FF] px-5 py-5 md:px-6 md:py-10">
      {/* Left */}
      <div className="m-1 flex justify-center md:m-5">
        <p>
          <span className="text-3xl font-bold text-black md:text-7xl">
            Explore{" "}
          </span>
          <span className="text-3xl font-bold text-[#6366F1] md:text-7xl">
            100+
          </span>
          <br />
          <span className="text-3xl font-bold text-[#6366F1] md:text-7xl">
            Tour{" "}
          </span>
          <span className="text-3xl font-bold text-black md:text-7xl">in </span>
          <span className="text-3xl font-bold text-[#6366F1] md:text-7xl">
            DebTour
          </span>
          <br />
          <br />
          <span className="text-sm text-black md:text-xl">
            The platform for tourist that finding high quality tour
          </span>
        </p>
      </div>
      {/* Right */}
      <div className="m-1 flex w-3/5 justify-center md:m-5 md:w-2/4">
        <Image
          src="/LandingPage-Minimap.png"
          alt="landing"
          width={600}
          height={600}
        />
      </div>
    </div>
  );
};

export default LandingBanner;
