import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Button } from "./ui/button";
import Link from "next/link";

/* eslint-disable @next/next/no-img-element */

interface RecommendCardType {
  name: string;
  imgPath: string;
  alt: string;
  link: string;
}

const RecommendCard = ({ name, imgPath, alt, link }: RecommendCardType) => {
  return (
    <div className="relative mx-auto h-[400px] w-[300px] overflow-hidden rounded-3xl duration-100 hover:scale-105">
      <div className="absolute inset-0 overflow-hidden rounded-3xl shadow-md">
        <img className="h-full w-full object-cover" src={imgPath} alt={alt} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent duration-100 hover:opacity-50"></div>
      </div>

      <div className="absolute bottom-0 w-full px-6 py-4 text-right text-white">
        <h3 className="text-2xl font-bold">{name}</h3>

        <Link href={link}>
          <Button variant={"link"} className="group mt-2 p-0 text-white">
            See more{" "}
            <MdOutlineKeyboardArrowRight className="dur relative mx-0 group-hover:left-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RecommendCard;
