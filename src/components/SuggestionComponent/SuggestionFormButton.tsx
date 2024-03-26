'use client'

import { useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { z } from "zod"
import { useSession } from "next-auth/react"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "../ui/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Textarea } from "../ui/textarea"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import createSuggestion from "@/lib/createSuggestion"

const Suggestion = z.object({
    description: z.string().min(1).max(1000),
    locationRequest: z.object({
        address: z.string().min(1).max(50),
        latitude: z.number().or(z.string().regex(/\d+/).transform(Number)).refine((n) => -90 <= n && n <= 90),
        longitude: z.number().or(z.string().regex(/\d+/).transform(Number)).refine((n) => -180 <= n && n <= 180),
        name: z.string().min(1).max(50),
        type: z.enum([
            "Hotel",
            "Attraction",
            "Restaurant",
            "Meeting Point",
            "Other",
        ]),
    }),
    touristUsername: z.string().min(1).max(50),
})
const location_types = ["Hotel", "Attraction", "Restaurant", "Meeting Point", "Other"]
export default function SuggestionFormButton() {
    const { data: session, status } = useSession()
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof Suggestion>>({
        resolver: zodResolver(Suggestion),
        defaultValues: {
            description: "",
            locationRequest: {
                address: "",
                latitude: 0,
                longitude: 0,
                name: "",
                type: "Other",
            },
            touristUsername: session?.user?.id??"",
        }
    });

    async function onSubmit(values: z.infer<typeof Suggestion>) {
        const res = await createSuggestion(session?.user?.serverToken, values);
        if (!res.success) {
            toast({ title: "Failed to create suggestion", description: "An error occurred while creating the suggestion" });
            return;
        }
        toast({ title: "Suggestion created", description: "Your suggestion has been created successfully" });
        setOpen(false);
        form.reset();
        const wait = () => new Promise((resolve) => setTimeout(resolve, 500));
        wait().then(() => {
            window.location.reload();
        });
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button>Add Suggestion</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Suggestion</DialogTitle>
                    <DialogDescription>Share your suggestion with agencies</DialogDescription>
                </DialogHeader>
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
                            <div className="flex flex-wrap gap-6 w-full">
                                <FormField
                                    control={form.control}
                                    name="locationRequest.address"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel htmlFor="address" className="block text-sm font-medium text-gray-700">Address</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    id="address"
                                                    name="locationRequest.address"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex gap-6 w-full">
                                    <FormField
                                        control={form.control}
                                        name="locationRequest.latitude"
                                        render={({ field }) => (
                                            <FormItem className="grow">
                                                <FormLabel htmlFor="latitude" className="block text-sm font-medium text-gray-700">Latitude</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} min="-90" max="90" step="0.0000001" id="latitude" name="locationRequest.latitude" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="locationRequest.longitude"
                                        render={({ field }) => (
                                            <FormItem className="grow">
                                                <FormLabel htmlFor="longitude" className="block text-sm font-medium text-gray-700">Longitude</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} min="-180" max="180" step="0.0000001" id="longitude" name="locationRequest.longitude" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="locationRequest.name"
                                    render={({ field }) => (
                                        <FormItem className="grow">
                                            <FormLabel htmlFor="name" className="block text-sm font-medium text-gray-700">Location Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    id="name"
                                                    name="locationRequest.name"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="locationRequest.type"
                                    render={({ field }) => (
                                        <FormItem className="grow">
                                            <FormLabel htmlFor="type" className="block text-sm font-medium text-gray-700">Type</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a location type" />
                                                </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                {location_types.map((type) => (
                                                    <SelectItem key={type} value={type}>
                                                    {type}
                                                    </SelectItem>
                                                ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </form>
                    </Form>
                <DialogFooter className="mt-3">
                    <Button onClick={form.handleSubmit(onSubmit)} type="submit">Submit</Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>
        </div>
    )
}