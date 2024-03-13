'use client'

import createReview from "@/lib/createReview";
import reviewFormSchema from "@/model/reviewFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "../ui/use-toast";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

export default function CreateReviewForm({ tourId }: { tourId: string }) {
    const form = useForm<z.infer<typeof reviewFormSchema>>({
        resolver: zodResolver(reviewFormSchema),
        defaultValues: {
            description: "",
            ratingScore: 5,
            tourId: parseInt(tourId),
            touristUsername: "John Smith",
        }
    });
    async function onSubmit(values: z.infer<typeof reviewFormSchema>) {
        console.log(values);
        const res = await createReview("token", values);
        console.log(res);
        if (!res.success) {
            toast({ title: "Failed to create review", description: "An error occurred while creating the review" });
            return;
        }
        toast({ title: "Review created", description: "Your review has been created successfully" });
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
                                    <Input
                                        {...field}
                                        type="number"
                                        id="ratingScore"
                                        name="ratingScore"
                                        min={1}
                                        max={5}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" >Submit</Button>
                </form>
            </Form>
        </div>
        )
}