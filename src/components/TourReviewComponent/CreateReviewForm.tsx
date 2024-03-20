'use client'

import createReview from "@/lib/createReview";
import reviewFormSchema from "@/model/reviewFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "../ui/use-toast";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useSession } from "next-auth/react";
import { MdOutlineStar, MdOutlineStarOutline } from "react-icons/md";

export default function CreateReviewForm({ tourId, submitCallback }: { tourId: string, submitCallback: Function}) {
    const { data: session, status } = useSession()
    const form = useForm<z.infer<typeof reviewFormSchema>>({
        resolver: zodResolver(reviewFormSchema),
        defaultValues: {
            description: "",
            ratingScore: 5,
            tourId: parseInt(tourId),
            touristUsername: session?.user?.name??"",
        }
    });
    async function onSubmit(values: z.infer<typeof reviewFormSchema>) {
        const res = await createReview(values);
        if (!res.success) {
            toast({ title: "Failed to create review", description: "An error occurred while creating the review" });
            return;
        }
        toast({ title: "Review created", description: "Your review has been created successfully" });
        submitCallback();
    }
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="description" className="block text-sm font-medium text-gray-700">Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        id="description"
                                        name="description"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="ratingScore"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="ratingScore" className="block text-sm font-medium text-gray-700">Rating</FormLabel>
                                <FormControl>
                                <div className="flex justify-start">
                                    {[...Array(form.getValues().ratingScore)].map((_, i) => (
                                        <MdOutlineStar className="h-8 w-8 text-yellow-500" 
                                            onClick={() => form.setValue("ratingScore", i+1)}
                                            key={i}
                                        />
                                    ))}
                                    {[...Array(5-form.getValues().ratingScore)].map((_, i) => (
                                        <MdOutlineStarOutline className="h-8 w-8 text-gray-500" 
                                            onClick={() => form.setValue("ratingScore", form.getValues().ratingScore+i+1)}
                                            key={i}
                                        />
                                    ))}
                                </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" >Submit</Button>
                    {/* <Button onClick={()=>console.log(form.getValues())}>Log</Button> */}
                </form>
            </Form>
        </div>
        )
}