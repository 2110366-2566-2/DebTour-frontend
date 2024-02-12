"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUserStore } from "../context/store";

const Navbar = () => {
  const user = useUserStore((state) => state.role);
  console.log("User:", user);

  return (
    <nav className="grid min-h-[60px] w-full items-center border-b-2 dark:bg-gray-800">
      <div className="container flex items-center justify-start px-4 lg:px-6">
        <Link className="mr-6 flex items-center gap-2" href="#">
          <span className="font-semibold">DebTour</span>
        </Link>
        <nav className="hidden w-full flex-1 justify-center gap-4 lg:flex">
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium text-gray-500 hover:text-primary focus:outline-none"
            href="/"
          >
            Home
          </Link>
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium text-gray-500 hover:text-primary focus:outline-none"
            href="/tourist/tours"
          >
            Tours
          </Link>
        </nav>
        <div className="ml-auto hidden gap-6 lg:flex">
          <Button>
            <Link href="/auth">Log In / Sign Up</Link>
          </Button>
        </div>
        <div className="ml-auto lg:hidden">
          <Button size="icon" variant="outline">
            {/* menu icon */}
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
