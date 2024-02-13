/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { MdArrowDropDownCircle } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import RecommendCard from "@/components/RecommendCard";

const LandingPage = () => {
  return (
    <div>
      {/* banner */}
      <section
        className="mx-auto mt-8 flex h-[550px] max-w-[1300px] flex-col items-center justify-around rounded-[36px] bg-indigo-300 py-12 text-center"
        style={{
          backgroundImage: "url('/banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div>
          <p className="mx-auto mb-6 max-w-fit rounded-full bg-white bg-opacity-50 px-6 py-[6px] text-[10px] font-light uppercase backdrop-blur-md md:text-xs">
            - The platform for tourists and agencies -
          </p>
          <h1 className="text-4xl font-extrabold text-white drop-shadow-lg md:text-6xl lg:text-7xl">
            Journey beyond <br />
            the ordinary
          </h1>
        </div>

        <div className="relative">
          <Button
            className="mt-16 w-[150px] font-bold uppercase duration-100 hover:scale-105"
            variant={"outline"}
          >
            Get Started
          </Button>

          <MdArrowDropDownCircle className="absolute inset-0 top-[100px] mx-auto mt-5 flex h-7 w-7 items-center justify-center text-white" />
        </div>
      </section>

      {/* Who's on DebTour */}
      <section className="mt-16 bg-indigo-100 py-20">
        <div className=" mx-auto grid max-w-[1200px] grid-cols-1 overflow-hidden rounded-[36px] bg-white md:grid-cols-[55fr_45fr]">
          <div className="flex flex-col gap-4 px-12 py-8">
            <h2 className="my-8  text-3xl font-extrabold md:text-[42px]">{`Who's on DebTour ?`}</h2>
            <p className="max-w-[60ch] text-sm leading-8 md:text-base md:leading-8">
              <span className="font-bold">DebTour</span> is the perfect platform
              for both travelers seeking personalized experiences and agencies
              looking to create tailored tours for their clients. Whether you
              are a traveler or a tour agency, DebTour provides the ideal
              platform to connect and create unforgettable travel experiences.
            </p>
          </div>

          <img
            src="/debtour1.jpg"
            className="mx-auto h-full max-h-[370px] w-full object-cover md:max-h-[500px] lg:max-h-full"
            alt=""
          />
        </div>
      </section>

      {/* Recommend */}

      <section className="py-20">
        <h2 className="mb-12 text-center text-4xl font-extrabold">
          Recommended For You
        </h2>

        <div className="mx-auto grid max-w-[1100px] grid-cols-3">
          <RecommendCard
            name={"Chiang Rai, Thailand"}
            imgPath={"/wat-rong-kun.jpg"}
            alt={"Wat rong kun"}
            link={"/"}
          />

          <RecommendCard
            name={"Shibuya, Japan"}
            imgPath={"/shibuya.jpg"}
            alt={"Shibuya"}
            link={"/"}
          />

          <RecommendCard
            name={"Paris, France"}
            imgPath={"/eifel.jpg"}
            alt={"Eiffel tower"}
            link={"/"}
          />
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
