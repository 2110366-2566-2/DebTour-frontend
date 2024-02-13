/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { MdArrowDropDownCircle } from "react-icons/md";

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
      <section className="mt-16 bg-indigo-200">
        <h2 className="text-center text-5xl font-extrabold">{`Who's on DebTour`}</h2>

        <div className="grid grid-cols-2 gap-12">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum
            enim, odio cum facilis, nulla quam, provident beatae perspiciatis
            esse eum quis quasi? Quae laudantium adipisci ducimus eveniet, in
            aut earum.
          </p>

          <img src="/public/WhoOnDebTour.png" alt="" />
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
