'use client'
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Signup() {
    return (
        <main className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <div
                className=" w-[630px] rounded-md border bg-white px-12 py-6 shadow-lg"
            >
                <p className="my-6 text-center text-3xl font-bold italic text-indigo-700">
                    DebTour
                </p>
                <div className="mx-auto w-full max-w-lg pb-10">
                    <h2 className=" mb-6 mt-10 text-center text-lg font-bold">
                        Register As
                    </h2>
                    <div className="flex gap-4">
                        <Link href={"/auth/signup/tourist"}>
                            <Card className="duration-75 hover:scale-105 hover:cursor-pointer hover:bg-gray-200">
                                <CardHeader>
                                    <CardTitle className="text-xl">Tourist</CardTitle>
                                    <CardDescription>
                                        Find interesting tours and have fun!
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </Link>

                        <Link href={"/auth/signup/agency"}>
                            <Card className="duration-75 hover:scale-105 hover:cursor-pointer hover:bg-gray-200">
                                <CardHeader>
                                    <CardTitle className="text-xl">Agency</CardTitle>
                                    <CardDescription>
                                        Post your tours and gain the profit!
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}