/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/context/store";
import { SiYourtraveldottv } from "react-icons/si";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const userRole = useUserStore((state) => state.role);

  const pathname = usePathname();
  const [activeRoute, setActiveRoute] = useState("");

  useEffect(() => {
    setActiveRoute(pathname);
    console.log(activeRoute);
  }, [pathname]);

  return (
    <nav className="grid min-h-[60px] w-full items-center">
      <div className="container flex items-center justify-start px-4 lg:px-6">
        <Link className="mr-6 flex items-center gap-3" href="/">
          <SiYourtraveldottv className="h-8 w-8" />
          <span className="text-xl font-semibold">DebTour</span>
        </Link>

        <div className="hidden w-full gap-4 px-8 lg:flex">
          <Link
            className={`inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium ${
              activeRoute === "/" ? "text-primary" : "text-gray-500"
            } hover:text-primary focus:outline-none`}
            href="/"
          >
            Home
          </Link>

          <Link
            className={`inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium ${
              activeRoute === "/tourist/tours"
                ? "text-primary"
                : "text-gray-500"
            } hover:text-primary focus:outline-none`}
            href="/tourist/tours"
          >
            Tours
          </Link>

          {userRole === "agency" && (
            <Link
              className={`inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium ${
                activeRoute === "/agency/tours"
                  ? "text-primary"
                  : "text-gray-500"
              } hover:text-primary focus:outline-none`}
              href="/agency/tours"
            >
              Manage Tours
            </Link>
          )}
        </div>

        <div className="ml-auto hidden gap-6 lg:flex">
          {userRole === "guest" ? (
            <Button>
              <Link href="/auth">Log In / Sign Up</Link>
            </Button>
          ) : (
            <img
              src="/avatar.webp"
              className="h-8 w-8 rounded-full"
              alt="avatar"
            />
          )}
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
