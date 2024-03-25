"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import memberFormSchema from "@/model/memberFormSchema";
import joinTour from "@/lib/joinTour";
import { toast } from "@/components/ui/use-toast"

export default function MemberJoinForm({tourId}: {tourId: string}) {
    const form = useForm<z.infer<typeof memberFormSchema>>({
        resolver: zodResolver(memberFormSchema),
        defaultValues: {
            joinedMembers: [
                {
                    memberId: 0,
                    firstName: "Timmie",
                    lastName: "Tod",
                    age: 22
                }
            ],
            tourId: parseInt(tourId),
            touristUsername: "tempUser"
        }
    });
    
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "joinedMembers",
    })
    async function onSubmit(values: z.infer<typeof memberFormSchema>) {
        // console.log(values);
        const res = await joinTour(values);
        if(!res.success) {
            toast({ title: "Failed to join tour", description: "Please try again"});
            return;
        }
        toast({ title: "Successfully joined tour", description: "You are now a member of this tour"});
    }
    return (
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full mt-8 flex flex-col justify-center'>
                <table className="table-fixed w-5/6 border-collapse mx-auto min-w-[400px]">
                    <thead>
                        <tr>
                            <th className="w-2/15">Member</th>
                            <th className="w-1/3">First Name</th>
                            <th className="w-1/3">Last Name</th>
                            <th className="w-1/5">Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fields.map((field, index) => (
                            <tr key={field.id} className="text-center">
                                <td>{index + 1}</td>
                                <td>
                                    <Input
                                        {...form.register(`joinedMembers.${index}.firstName`)}
                                        className="mx-auto my-3 w-11/12"
                                        type="text"
                                        placeholder="First Name"
                                    />
                                </td>
                                <td>
                                    <Input
                                        {...form.register(`joinedMembers.${index}.lastName`)}
                                        className="mx-auto my-3 w-11/12"
                                        type="text"
                                        placeholder="Last Name"
                                    />
                                </td>
                                <td>
                                    <Input
                                        {...form.register(`joinedMembers.${index}.age`)}
                                        className="mx-auto my-3 w-3/5"
                                        type="number"
                                        placeholder="Age"
                                    />
                                </td>
                                <td>
                                    <button
                                        className="text-white"
                                        type="button"
                                        onClick={() => remove(index)}
                                        style={{ color: "#4338CA" }}
                                    >
                                        {/* trash icon */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" fill="#474747"></path>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Button onClick={(e) => {append(
                    {
                        memberId: 0,
                        firstName: "",
                        lastName: "",
                        age: 0
                    }
                )}} className="w-[120px] mx-auto mt-4">Add Member</Button>
                <div className='flex justify-between w-full mt-32'>
                    <Link className={buttonVariants({ variant: "outline" })} href={`/tourist/tours/${tourId}`}>Back</Link>
                    <Button type="submit">Submit</Button>
                </div>
            </form>
    )
}