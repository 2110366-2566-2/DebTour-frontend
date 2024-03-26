/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {SiYourtraveldottv} from "react-icons/si";

import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import {signOut, useSession} from "next-auth/react";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import getUser from "@/lib/getMe";
import {useUserStore} from "@/context/store";
import logout from "@/lib/logout";
import getMe from "@/lib/getMe";

function Navbar() {
    const {data: session, status, update} = useSession();
    const userRole = session?.user?.role ?? "Guest";

    const pathname = usePathname();
    const [activeRoute, setActiveRoute] = useState("");


    useEffect(() => {
        setActiveRoute(pathname);
    }, [pathname, userRole]);

    return (
        <nav className="grid min-h-[60px] w-full items-center">
            <div className="container flex items-center justify-start px-4 lg:px-6">
                <Link className="mr-6 flex items-center gap-3" href="/">
                    <SiYourtraveldottv className="h-8 w-8"/>
                    <span className="text-xl font-semibold">DebTour</span>
                </Link>
                {/* <Button size="icon" variant="outline" onClick={() => { console.log(session); }}>Log</Button> */}
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

                    {userRole === "Agency" && (
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

                {userRole === "Guest" &&
                    <Button>
                        <Link href="/auth">Log In / Sign Up</Link>
                    </Button>
                }
                {
                    userRole !== "Guest" &&
                    <Image
                        src={session?.user?.image ?? "/avatar.png"}
                        className="h-8 w-8 rounded-full"
                        alt="avatar"
                        width={0}
                        height={0}
                    />
                }


                {userRole !== "Guest" &&
                    <div className="ml-4">
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
                                {userRole !== "Admin" &&
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            {userRole === "Tourist" &&
                                                <Link className="w-full" href={'/tourist/profile'}>Edit Profile</Link>
                                            }
                                            {
                                                userRole === "Agency" &&
                                                <Link className="w-full" href={'/agency/profile'}>Edit Profile</Link>
                                            }

                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>}
                                {
                                    (userRole === "Tourist" || userRole == "Agency") &&
                                    <DropdownMenuItem>
                                        <Link className="w-full" href={'/report-issue'}>Report Issue</Link>
                                    </DropdownMenuItem>
                                }
                                {userRole === "Agency" &&
                                    <DropdownMenuItem>
                                        <Link className="w-full" href={'/agency/suggestion'}>Suggestion</Link>
                                    </DropdownMenuItem>
                                }
                                {userRole === "Tourist" &&
                                    <DropdownMenuItem>
                                        <Link className="w-full" href={'/tourist/suggestion'}>Suggestion</Link>
                                    </DropdownMenuItem>
                                }
                                {
                                    userRole === "Admin" &&
                                    <DropdownMenuItem>
                                        <Link className="w-full" href={'/admin/manage-issue'}>Manage Issue</Link>
                                    </DropdownMenuItem>
                                }
                                {
                                    userRole === "Admin" &&
                                    <DropdownMenuItem>
                                        <Link className="w-full" href={'/admin/verify-agency'}>Verify Agency</Link>
                                    </DropdownMenuItem>
                                }
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem onClick={async () => {
                                    const res = await logout(session?.user.serverToken)
                                    console.log(res)
                                    signOut();
                                }
                                }>
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
