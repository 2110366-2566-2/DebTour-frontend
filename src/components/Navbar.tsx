import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps } from "react";

const Navbar = () => {
  return (
    <nav className="grid min-h-[60px] w-full items-center border-b-2 dark:bg-gray-800">
      <div className="container flex items-center justify-start px-4 lg:px-6">
        <Link className="mr-6 flex items-center gap-2" href="#">
          <CompassIcon className="h-6 w-6" />
          <span className="font-semibold">DebTour</span>
        </Link>
        <nav className="hidden w-full flex-1 justify-center gap-4 lg:flex">
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium text-gray-500 hover:text-primary focus:outline-none focus:ring-1 dark:text-gray-400 dark:hover:text-gray-50 dark:focus:ring-gray-50"
            href="/"
          >
            Home
          </Link>
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium text-gray-500 hover:text-primary focus:outline-none focus:ring-1 dark:text-gray-400 dark:hover:text-gray-50 dark:focus:ring-gray-50"
            href="/tourist/tours"
          >
            Tours
          </Link>
        </nav>
        <div className="ml-auto hidden gap-6 lg:flex">
          <Button variant="outline">
            <Link href="#">Log In</Link>
          </Button>
          <Button>
            <Link href="#">Register</Link>
          </Button>
        </div>
        <div className="ml-auto lg:hidden">
          <Button size="icon" variant="outline">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

function CompassIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
