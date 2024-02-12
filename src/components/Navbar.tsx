import Link from "next/link";
import { Button } from "@/components/ui/button";

const Navbar = () => {
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
          <Button variant="outline">
            <Link href="/auth">Log In</Link>
          </Button>
          <Button>
            <Link href="/auth">Sign up</Link>
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
