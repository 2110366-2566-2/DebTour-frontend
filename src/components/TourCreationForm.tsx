"use client"
import Link from 'next/link';
import { buttonVariants } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

import { Textarea } from "@/components/ui/textarea"
import DateInput from './TourCreationFormInput/DateInput';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

const formSchema = z.object({
    tourname: z.string().min(1).max(50),
    start_date: z.date({
        required_error: "A start date is required",
    }),
    end_date: z.date({
        required_error: "An end date is required",
    }),
    refund_due_date: z.date({
        required_error: "A refund due date is required",
    }),
    overview_location_name: z.string().min(1).max(100),
    description: z.string().min(2).max(5000),
    cost: z.number().or(z.string().regex(/\d+/).transform(Number)),
    max_number: z.array(z.number().int().min(1)),
    activities: z.array(
        z.object({
            name: z.string().min(1).max(50), 
            description: z.string().min(1).max(500), 
            activity_start_date: z.date(), 
            activity_end_date: z.date(), 
            location: z.string().min(1).max(50), 
            coor: z.tuple([z.number(), z.number()])}
        )).min(1).max(50),
}).refine((data) => {
    if (data.start_date >= data.end_date) {
        return { message: "Start date must be before end date", path: ["start_date", "end_date"] }
    }
    return true
}).refine((data) => {
    if (data.refund_due_date >= data.start_date) {
        return { message: "Refund due date must be before start date", path: ["start_date","refund_due_date"] }
    }
    return true
})

const TourCreationForm = () => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tourname: "",
            start_date: new Date(),
            end_date: new Date(),
            refund_due_date: new Date(),
            description: "",
            cost: 0,
            max_number: [50],
            overview_location_name: "",
            activities: [
                {
                    name: "",
                    description: "",
                    activity_start_date: new Date(),
                    activity_end_date: new Date(),
                    location: "",
                    coor: [0,0],
                },
            ],
        },
    })
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "activities",
    })
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated. (Only run when valid)
        // Example values when form is submitted:
        // {
        //     "tourname":"sdasda",
        //     "start_date":"2024-02-11T13:04:00.741Z",
        //     "end_date":"2024-02-11T13:04:00.741Z",
        //     "refund_due_date":"2024-02-11T13:04:00.741Z",
        //     "overview_location_name":"asdsad",
        //     "description":"sadsad","cost":0,
        //     "max_number":[50],
        //     "activities":[
        //         {
        //             "name":"sadasd",
        //             "description":"sadasd",
        //             "activity_start_date":"2024-02-11T13:04:00.741Z",
        //             "activity_end_date":"2024-02-11T13:04:00.741Z",
        //             "location":"saddsa",
        //             "coor":[0,0]
        //         }
        //     ]
        // }
        toast({ title: "Form submitted!", description: JSON.stringify(values) })
    }
    return (
        <div className="p-3">
            <Link className={buttonVariants({ variant: "outline" })} href="/agency/tour">Back</Link>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-7 mx-10 overflow-hidden">
                    <FormField
                        control={form.control}
                        name="tourname"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <input className='block outline-none font-bold text-5xl focus:underline decoration-1 underline-offset-2' placeholder='Tour Name' spellCheck="false" autoComplete="false" {...field}></input>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-wrap gap-8">
                        <DateInput form={form} name="start_date" label="Start Date" />
                        <DateInput form={form} name="end_date" label="End Date" />
                        <DateInput form={form} name="refund_due_date" label="Refund Due Date" />
                    </div>
                    <FormField
                        control={form.control}
                        name="overview_location_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Overview Location</FormLabel>
                                <FormControl>
                                    <Input placeholder="ex. Doi Inthanon" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="ex. This is a tour to Doi Inthanon" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cost"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cost</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="max_number"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Maximum number of people: <span>{field.value}</span></FormLabel>
                                <FormControl>
                                    <Slider 
                                        defaultValue={[50]}
                                        min={1}
                                        max={100}
                                        step={1}
                                        className="w-[60%] py-4"
                                        onValueChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Label>Activities</Label>
                    {/* add a button to create more input for activities */}
                    {fields.map((activity, index) => (<div className='flex gap-4'>
                        <Button onClick={() => remove(index)} className="rounded-full w-12 h-12 text-2xl">-</Button>
                        <div key={activity.id} className="flex flex-wrap gap-4">
                            <FormField
                                control={form.control}
                                name={`activities.${index}.name`}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col grow">
                                        <FormLabel>Activity Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="ex. Hiking" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`activities.${index}.description`}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col grow">
                                        <FormLabel>Activity Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="ex. Hiking in the mountains" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DateInput form={form} name={`activities.${index}.activity_start_date`} label="Activity Start Date" grow/>
                            <DateInput form={form} name={`activities.${index}.activity_end_date`} label="Activity End Date" grow/>
                            <FormField
                                control={form.control}
                                name={`activities.${index}.location`}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col grow">
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <Input placeholder="ex. Doi Inthanon" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        </div>
                    ))}
                    <div className="flex gap-4 justify-start items-center">
                        <Button onClick={(e) => {append(
                            {
                                name: "",
                                description: "",
                                activity_start_date: new Date(),
                                activity_end_date: new Date(),
                                location: "",
                                coor: [0,0],
                            }
                        ),e.preventDefault()}} className="rounded-full w-12 h-12 text-2xl">+</Button>
                        <Label htmlFor="addActivity" className='text-slate-400'>Add activity</Label>
                    </div>
                    <div className="flex gap-4 justify-end items-center">
                        <Label htmlFor="submitBtn" className='text-slate-400'>Create new tour!</Label>
                        <Button id="submitBtn" type="submit" className="rounded-full w-12 h-12 text-2xl">+</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
export default TourCreationForm;
