"use client";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

import { Textarea } from "@/components/ui/textarea";
import DateInput from "./TourCreationFormInput/DateInput";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { create } from "domain";
import createTour from "@/lib/createTour";
import getTour from "@/lib/getTour";
import updateTour from "@/lib/updateTour";
import { useEffect } from "react";

const location_types = [
  "Hotel",
  "Attraction",
  "Restaurant",
  "Meeting Point",
  "Other",
];
const formSchema = z
  .object({
    name: z.string().min(1).max(50),
    startDate: z.date({
      required_error: "A start date is required",
    }),
    endDate: z.date({
      required_error: "An end date is required",
    }),
    refundDueDate: z.date({
      required_error: "A refund due date is required",
    }),
    overviewLocation: z.string().min(1).max(100),
    description: z.string().min(2).max(5000),
    price: z.number().or(z.string().regex(/\d+/).transform(Number)),
    maxMemberCount: z.array(z.number()).length(1),
    activities: z
      .array(
        z.object({
          name: z.string().min(1).max(50),
          description: z.string().min(1).max(500),
          startTimestamp: z.date(),
          endTimestamp: z.date(),
          location: z.object({
            name: z.string().min(1).max(50),
            latitude: z.number(),
            longtitude: z.number(),
            type: z.enum([
              "Hotel",
              "Attraction",
              "Restaurant",
              "Meeting Point",
              "Other",
            ]),
            address: z.string().min(1).max(100),
          }),
        }),
      )
      .min(1)
      .max(50),
  })
  .refine((data) => {
    if (data.startDate >= data.endDate) {
      return {
        message: "Start date must be before end date",
        path: ["startDate", "endDate"],
      };
    }
    return true;
  })
  .refine((data) => {
    if (data.refundDueDate >= data.startDate) {
      return {
        message: "Refund due date must be before start date",
        path: ["startDate", "refundDueDate"],
      };
    }
    return true;
  })
  .refine((data) => {
    if (data.price <= 0) {
      return { message: "Price must be more than zero", path: ["price"] };
    }
    return true;
  });

export default function TourCreationForm({ tourId }: { tourId?: string }) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      startDate: new Date(),
      endDate: new Date(),
      refundDueDate: new Date(),
      overviewLocation: "",
      description: "",
      price: 1,
      maxMemberCount: [50],
      activities: [
        {
          name: "",
          description: "",
          startTimestamp: new Date(),
          endTimestamp: new Date(),
          location: {
            name: "",
            latitude: 0,
            longtitude: 0,
            type: "Other",
            address: "",
          },
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "activities",
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated. (Only run when valid)
    const tempMax = values.maxMemberCount[0];
    const sentValues = JSON.parse(
      JSON.stringify(values).replace(
        /"maxMemberCount":\[\d+\]/,
        `"maxMemberCount":${tempMax}`,
      ),
    );
    if (!tourId) {
      const res = await createTour("token", sentValues);
      if (!res.success) {
        toast({
          title: "Failed to create tour",
          description: "Please try again",
        });
        return;
      }
      toast({
        title: "Form submitted!",
        description: `${sentValues.name} is created`,
      });
      return;
    } else {
      const res = await updateTour("token", sentValues, tourId);
      if (!res.success) {
        toast({
          title: "Failed to update tour",
          description: "Please try again",
        });
        return;
      }
      toast({
        title: "Form submitted!",
        description: `${sentValues.name} is updated`,
      });
      return;
    }
  }
  async function getValue() {
    if (tourId) {
      const res = await getTour(tourId);
      // console.log(res.data)
      let values = res.data;
      values.startDate = new Date(values.startDate);
      values.endDate = new Date(values.endDate);
      values.refundDueDate = new Date(values.refundDueDate);
      values.maxMemberCount = [values.maxMemberCount];
      // values.activities need to be added
      console.log(values);
      form.reset(res.data);
    }
  }
  useEffect(() => {
    getValue();
  }, [tourId]);
  return (
    <div className="p-5">
      <Link
        className={buttonVariants({ variant: "outline" })}
        href="/agency/tour"
      >
        Back
      </Link>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-10 mt-7 space-y-8 overflow-hidden p-5"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    className="block text-5xl font-bold decoration-1 underline-offset-2 outline-none focus:underline"
                    placeholder="Tour Name"
                    spellCheck="false"
                    autoComplete="false"
                    {...field}
                  ></input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-wrap gap-8">
            <DateInput form={form} name="startDate" label="Start Date" />
            <DateInput form={form} name="endDate" label="End Date" />
            <DateInput
              form={form}
              name="refundDueDate"
              label="Refund Due Date"
            />
          </div>
          <FormField
            control={form.control}
            name="overviewLocation"
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
                  <Textarea
                    placeholder="ex. This is a tour to Doi Inthanon"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
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
            name="maxMemberCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Maximum number of people: <span>{field.value}</span>
                </FormLabel>
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
          {fields.map((activity, index) => (
            <div className="flex gap-4" key={index}>
              <Button
                onClick={() => remove(index)}
                className="h-12 w-12 rounded-full text-2xl"
              >
                -
              </Button>
              <div key={activity.id} className="flex flex-wrap gap-4">
                <FormField
                  control={form.control}
                  name={`activities.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="flex grow flex-col">
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
                    <FormItem className="flex grow flex-col">
                      <FormLabel>Activity Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="ex. Hiking in the mountains"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DateInput
                  form={form}
                  name={`activities.${index}.startTimestamp`}
                  label="Activity Start Date"
                  grow
                />
                <DateInput
                  form={form}
                  name={`activities.${index}.endTimestamp`}
                  label="Activity End Date"
                  grow
                />
                <FormField
                  control={form.control}
                  name={`activities.${index}.location.name`}
                  render={({ field }) => (
                    <FormItem className="flex grow flex-col">
                      <FormLabel>Location Name</FormLabel>
                      <FormControl>
                        <Input placeholder="ex. Doi Inthanon" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`activities.${index}.location.latitude`}
                  render={({ field }) => (
                    <FormItem className="flex grow flex-col">
                      <FormLabel>Latitude</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`activities.${index}.location.longtitude`}
                  render={({ field }) => (
                    <FormItem className="flex grow flex-col">
                      <FormLabel>Longtitude</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`activities.${index}.location.type`}
                  render={({ field }) => (
                    <FormItem className="flex grow flex-col">
                      <FormLabel>Location Type</FormLabel>
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
                            <SelectItem key={type + index * 10} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`activities.${index}.location.address`}
                  render={({ field }) => (
                    <FormItem className="flex grow flex-col">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ex. 123/4 Doi Inthanon"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
          <div className="flex items-center justify-start gap-4">
            <Button
              onClick={(e) => {
                append({
                  name: "",
                  description: "",
                  startTimestamp: new Date(),
                  endTimestamp: new Date(),
                  location: {
                    name: "",
                    latitude: 0,
                    longtitude: 0,
                    type: "Other",
                    address: "",
                  },
                }),
                  e.preventDefault();
              }}
              className="h-12 w-12 rounded-full text-2xl"
            >
              +
            </Button>
            <Label htmlFor="addActivity" className="text-slate-400">
              Add activity
            </Label>
          </div>
          <div className="flex items-center justify-end gap-4">
            <Label htmlFor="submitBtn" className="text-slate-400">
              {tourId ? "Update the tour!" : "Create new tour!"}
            </Label>
            <Button
              id="submitBtn"
              type="submit"
              className="h-12 w-12 rounded-full text-2xl"
            >
              +
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
