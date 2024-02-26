import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MdOutlineStar } from "react-icons/md";
import { MdOutlineStarHalf } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import { MdCalendarMonth } from "react-icons/md";
import { GrMoney } from "react-icons/gr";
import { MdPeople } from "react-icons/md";
import { RiRefund2Line } from "react-icons/ri";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ReviewSection from "@/components/TourReviewComponent/ReviewSection";

const TourInfo = ({ params }: { params: { tourId: string } }) => {
  return (
    <main>
      <section className="mb-32 h-[350px] bg-indigo-100">
        <div className="container relative h-full py-12 text-center">
          <h1 className=" my-6 text-5xl font-bold">
            Chiang Mai Temple Tour 2024
          </h1>
          <p className="my-2 font-semibold text-indigo-700">
            Agency: Tour Na Rok Company
          </p>

          <div className="flex justify-center">
            <MdOutlineStar className="h-8 w-8 text-yellow-500" />
            <MdOutlineStar className="h-8 w-8 text-yellow-500" />
            <MdOutlineStar className="h-8 w-8 text-yellow-500" />
            <MdOutlineStar className="h-8 w-8 text-yellow-500" />
            <MdOutlineStarHalf className="h-8 w-8 text-yellow-500" />
          </div>

          <Link href={`/tourist/tours/join/${params.tourId}`}>
            <Button className="my-6">Join Tour</Button>
          </Link>

          <div className="absolute bottom-[-50px] left-0 right-0 mx-auto flex h-[100px] max-w-[1000px] items-center justify-evenly gap-2  rounded-2xl bg-white shadow-xl">
            <div className="grid max-w-[200px] grid-cols-[30px,1fr] items-center gap-3">
              <MdLocationOn className="h-7 w-7 rounded-full p-1 shadow-lg" />
              <div className="text-left text-xs">
                <p className="text-gray-500">Overview Location</p>
                <p className="font-bold">Chiang Mai, Thailand</p>
              </div>
            </div>

            <div className="grid max-w-[300px] grid-cols-[30px,1fr] items-center gap-3">
              <MdCalendarMonth className="h-7 w-7 rounded-full p-1 shadow-lg" />
              <div className="text-left text-xs">
                <p className="text-gray-500">Duration</p>
                <p className="font-bold">21 Aug 2024 - 24 Aug 2024</p>
              </div>
            </div>

            <div className="grid max-w-[200px] grid-cols-[30px,1fr] items-center gap-3">
              <GrMoney className="h-7 w-7 rounded-full p-1 shadow-lg" />
              <div className="text-left text-xs">
                <p className="text-gray-500">Price</p>
                <p className="font-bold">45000.00 Baht</p>
              </div>
            </div>

            <div className="grid max-w-[200px] grid-cols-[30px,1fr] items-center gap-3">
              <MdPeople className="h-7 w-7 rounded-full p-1 shadow-lg" />
              <div className="text-left text-xs">
                <p className="text-gray-500">Members</p>
                <p className="font-bold">23 / 50</p>
              </div>
            </div>

            <div className="grid max-w-[200px] grid-cols-[30px,1fr] items-center gap-3">
              <RiRefund2Line className="h-7 w-7 rounded-full p-1 shadow-lg" />
              <div className="text-left text-xs">
                <p className="text-gray-500">Refund Due Date</p>
                <p className="font-bold">5 Aug 2024</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mb-24">
        <h2 className="mb-12 text-3xl font-bold">Tour Information</h2>

        <div className="mx-auto grid max-w-[1200px] grid-cols-2">
          <Carousel className="w-full max-w-sm">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-4xl font-semibold">
                          {index + 1}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <p className="leading-8">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis
            expedita impedit sint excepturi quis reiciendis voluptas perferendis
            tempora distinctio eligendi corporis animi enim consectetur, et non
            iusto voluptatum maiores odio, nesciunt accusamus! Voluptatum
            expedita, nulla voluptates culpa cupiditate autem provident ipsum
            sit quos ducimus quis voluptatibus aspernatur perferendis tenetur
            dolor quibusdam! Non quis hic inventore illum atque, molestiae esse
            deserunt deleniti iste repellendus nulla, saepe error dolorem
            voluptatem est quasi laborum nisi provident ipsum illo excepturi.
            Alias itaque tenetur veritatis. Aliquam, distinctio expedita eos
            accusamus veritatis debitis blanditiis harum deleniti perferendis
            impedit sint dolor illum ducimus soluta numquam. Sint ut sapiente
          </p>
        </div>
      </section>

      <section className="container mb-24">
        <h2 className="mb-12 text-3xl font-bold">Tour Activities</h2>

        <p className="leading-8">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis
          expedita impedit sint excepturi quis reiciendis voluptas perferendis
          tempora distinctio eligendi corporis animi enim consectetur, et non
          iusto voluptatum maiores odio, nesciunt accusamus! Voluptatum
          expedita, nulla voluptates culpa cupiditate autem provident ipsum sit
          quos ducimus quis voluptatibus aspernatur perferendis tenetur dolor
          quibusdam! Non quis hic inventore illum atque, molestiae esse deserunt
          deleniti iste repellendus nulla, saepe error dolorem voluptatem est
          quasi laborum nisi provident ipsum illo excepturi. Alias itaque
          tenetur veritatis. Aliquam, distinctio expedita eos accusamus
          veritatis debitis blanditiis harum deleniti perferendis impedit sint
          dolor illum ducimus soluta numquam. Sint ut sapiente molestias
          consequuntur mollitia nisi, eos beatae, velit ipsa quia natus quaerat
          reiciendis eius suscipit exercitationem veniam iste sunt expedita nemo
          fugit aliquid placeat quos aspernatur. Ad voluptatem veritatis dicta
          quasi laboriosam ipsa laudantium nostrum doloribus eveniet, obcaecati
          voluptates sit perspiciatis, at minus in fugit ullam qui facere.
          Voluptate, deserunt sequi dolor ratione,
        </p>
      </section>
      <ReviewSection tourId={params.tourId} />
    </main>
  );
};

export default TourInfo;
