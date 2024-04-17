import Image from "next/image";

const AgencyRevenue = async () => {
  return (
    <main className="relative min-h-[calc(100vh-60px)] text-center">
      <div className="pt-20">
        <p className="text-sm font-bold uppercase sm:text-lg">
          current revenue
        </p>
        <div className="absolute left-[50%] my-2 h-[3px] w-20 translate-x-[-50%] bg-violet-500" />

        <p className="mt-8 text-5xl font-extrabold md:text-6xl">500000 ฿</p>
      </div>

      <Image
        src={"/get-revenue.svg"}
        width={400}
        height={400}
        alt="get your revenue via email"
        className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
      />

      <div className="absolute bottom-20 left-[50%] translate-x-[-50%]">
        <p className="text-sm text-gray-500">
          Please contact the administrator to get your revenue via
        </p>
        <p className="mt-4 text-base font-extrabold sm:text-lg md:text-2xl">
          contact@debtourofficial.com
        </p>

        <div className="absolute left-[50%] my-2 h-[3px] w-32 translate-x-[-50%] bg-violet-500" />
      </div>
    </main>
  );
};

export default AgencyRevenue;
