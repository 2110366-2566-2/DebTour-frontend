/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import {Button} from "@/components/ui/button";
import {useUserStore} from "@/context/store";
import {SiYourtraveldottv} from "react-icons/si";

import {usePathname} from "next/navigation";
import React, {useEffect, useState} from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Navbar = () => {
    const role = useUserStore((state) => state.role);

    const pathname = usePathname();
    const [activeRoute, setActiveRoute] = useState("");

    useEffect(() => {
        setActiveRoute(pathname);
    }, [pathname]);

    return (
        <nav className="grid min-h-[60px] w-full items-center">
            <div className="container flex items-center justify-start px-4 lg:px-6">
                <Link className="mr-6 flex items-center gap-3" href="/">
                    <SiYourtraveldottv className="h-8 w-8"/>
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

                    {role === "agency" && (
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
                    {role === "guest" ? (
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

                {role !== "guest" &&
                    <div className="ml-auto ml-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button size="icon" variant="outline">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960"
                                         width="24">
                                        <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
                                    </svg>
                                    <span className="sr-only">Toggle navigation menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator/>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        Edit Profile
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                {
                                    (role === "tourist" || role == "agency") &&
                                    <DropdownMenuItem>
                                        <Link href={'/report-issue'}>Report Issue</Link>
                                    </DropdownMenuItem>
                                }
                                {
                                    role === "admin" &&
                                    <DropdownMenuItem>
                                        <Link href={'/admin/manage-issue'}>Manage Issue</Link>
                                    </DropdownMenuItem>
                                }
                                {
                                    role === "admin" &&
                                    <DropdownMenuItem>
                                        <Link href={'/admin/verify-agency'}>Verify Agency</Link>
                                    </DropdownMenuItem>
                                }
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem>
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                }
            </div>
        </nav>
    );
};

export default Navbar;
