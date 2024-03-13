"use client"
import {useForm} from "react-hook-form";
import {z} from "zod";
import touristProfileSchema from "@/model/touristProfileSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useUserStore} from "@/context/store";
import {useEffect, useState} from "react";
import getTourist from "@/lib/getTourist";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Calendar as CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {format} from "date-fns";
import getUser from "@/lib/getUser";
import updateTourist from "@/lib/updateTourist";
import {redirect, useRouter} from "next/navigation";
import {toast} from "@/components/ui/use-toast";

export default function AgencyProfile() {
    const user = useUserStore()
    const [tourist, setTourist] = useState({} as any)

    useEffect(() => {
        async function get() {
            const res = await getTourist(user.username, user.token);
            if (!res) return
            let temp = tourist;
            // merge temp with res.data
            for (let key in res.data) {
                if (key == "Gender") {
                    temp["gender"] = res.data["Gender"]
                } else
                    temp[key] = res.data[key];
            }
            form.reset({
                phone: temp.phone,
                address: temp.address,
                image: temp.image,
                citizenId: temp.citizenId,
                firstName: temp.firstName,
                lastName: temp.lastName,
                email: temp.email,
                birthDate: new Date(temp.birthDate),
                gender: temp.gender,
                defaultPayment: temp.defaultPayment
            })
            setTourist(temp);
        }

        get();
    }, [user])

    useEffect(() => {
        async function get() {
            const res = await getUser();
            if (!res) return
            let temp = tourist;
            // merge temp with res.data
            for (let key in res.data) {
                if (temp[key] === undefined) temp[key] = res.data[key];
            }
            form.reset({
                phone: temp.phone,
                address: temp.address,
                image: temp.image,
                citizenId: temp.citizenId,
                firstName: temp.firstName,
                lastName: temp.lastName,
                email: temp.email,
                birthDate: new Date(temp.birthDate),
                gender: temp.gender,
                defaultPayment: temp.defaultPayment
            })
            setTourist(temp);
        }

        get();
    }, [user])

    const form = useForm<z.infer<typeof touristProfileSchema>>({
        resolver: zodResolver(touristProfileSchema),
        defaultValues: {
            phone: tourist.phone,
            address: tourist.address,
            image: tourist.image,
            citizenId: tourist.citizenId,
            firstName: tourist.firstName,
            lastName: tourist.lastName,
            email: tourist.email,
            birthDate: new Date(),
            gender: tourist.gender,
            defaultPayment: tourist.defaultPayment
        }
    })

    // console.log(tourist)
    // console.log(form.formState.errors)
    // console.log(form.getValues())

    async function onSubmit(values: z.infer<typeof touristProfileSchema>) {
        console.log(JSON.stringify(values))
        const res = await updateTourist(user.username, user.token, values)
        if (!res.success) {
            console.log("Failed to update tourist profile");
        }
        console.log("Successfully updated tourist profile");
        toast(
            {
                title: "Profile updated",
                description: "Your profile has been updated successfully",
            }
        )

    }

    return (
        <div className="mx-auto mt-8 w-[1000px] max-w-md rounded bg-white p-6 shadow-lg">
            <h1 className="text-xl font-bold">My Profile</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-6">
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Phone number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Phone number" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs"/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="citizenId"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Citizen ID</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your citizen ID"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs"/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>First name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your first name" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs"/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Last name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your last name" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs"/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-6">
                        <FormField
                            control={form.control}
                            name="address"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Write your address" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs"/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="birthDate"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Birth date</FormLabel>
                                    <FormControl>
                                        <div>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[280px] justify-start text-left font-normal",
                                                            !field.value && "text-muted-foreground",
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4"/>
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        initialFocus
                                                        disabled={(date) =>
                                                            date > new Date(new Date().toDateString())
                                                        }
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-xs"/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="gender"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Gender</FormLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Male">Male</SelectItem>
                                            <SelectItem value="Female">Female</SelectItem>
                                            <SelectItem value="Others">Others</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className="text-xs"/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="defaultPayment"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Default Payment</FormLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={"Credit Card"}>Credit Card</SelectItem>
                                            <SelectItem value={"Debit Card"}>Debit Card</SelectItem>
                                            <SelectItem value={"Paypal"}>Paypal</SelectItem>
                                            <SelectItem value={"PromptPay"}>PromptPay</SelectItem>
                                            <SelectItem value={"Mobile Banking"}>Mobile Banking</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className="text-xs"/>
                                </FormItem>
                            )}
                        />

                    </div>

                    <div className="flex justify-end mt-10">
                        <Button type="submit">Save Change</Button>
                    </div>

                </form>
            </Form>
        </div>
    )

}