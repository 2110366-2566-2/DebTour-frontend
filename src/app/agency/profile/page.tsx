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
import getUser from "@/lib/getMe";
import updateTourist from "@/lib/updateTourist";
import {redirect, useRouter} from "next/navigation";
import {toast} from "@/components/ui/use-toast";
import AgencyProfileSchema from "@/model/agencyProfileSchema";
import updateAgency from "@/lib/updateAgency";
import agencyProfileSchema from "@/model/agencyProfileSchema";
import {useSession} from "next-auth/react";
import getAgency from "@/lib/getAgency";
import getMe from "@/lib/getMe";

export default function AgencyProfile() {
    const {data: session, status, update} = useSession();
    const role = session?.user?.role;
    const token = session?.user?.serverToken;
    const username = session?.user?.id;

    const [agency, setAgency] = useState({} as any)

    const form = useForm<z.infer<typeof agencyProfileSchema>>({
        resolver: zodResolver(agencyProfileSchema),
        defaultValues: {
            phone: agency.phone,
            email: agency.email,
            image: agency.image,
            agencyName: agency.agencyName,
            address: agency.address,
            licenseNo: agency.licenseNo,
            bankAccount: agency.bankAccount,
            authorizeAdminUsername: agency.authorizeAdminUsername,
            authorizeStatus: agency.authorizeStatus,
            // approveTime: new Date(),
        }
    })

    // console.log(agency)
    // console.log(form.formState.errors)
    // console.log(form.getValues())

    useEffect(() => {
        async function get() {
            const res = await getMe(username, token)
            console.log(res.data)
            if (!res) return
            let temp = agency;
            // merge temp with res.data
            for (let key in res.data) {
                if (key == "Gender") {
                    temp["gender"] = res.data["Gender"]
                } else
                    temp[key] = res.data[key];
            }
            form.reset({
                phone: temp.phone,
                email: temp.email,
                image: temp.image,
                agencyName: temp.agencyName,
                address: temp.address,
                licenseNo: temp.licenseNo,
                bankAccount: temp.bankAccount,
                authorizeAdminUsername: temp.authorizeAdminUsername,
                authorizeStatus: temp.authorizeStatus,
                // approveTime: new Date(temp.approveTime),
            })
            setAgency(temp)
            form.reset(res.data)
        }

        get()
    }, [agency])


    async function onSubmit(values: z.infer<typeof AgencyProfileSchema>) {
        console.log(JSON.stringify(values))
        const res = await updateAgency(username, token, values)
        if (!res.success) {
            console.log("Failed to update agency profile");
        }
        console.log("Successfully updated agency profile");
        toast(
            {
                title: "Profile updated",
                description: "Your profile has been updated successfully",
            }
        )

    }

    return (
        <div className="mx-auto mt-8 w-[1000px] max-w-md rounded bg-white p-6 shadow-lg">
            <h1 className="text-xl font-bold">My Agency Profile</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-6">
                        <FormField
                            control={form.control}
                            name="agencyName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Agency Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your agency name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs"/>
                                </FormItem>
                            )}
                        />
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

                        <FormField control={form.control} name="bankAccount" render={({field}) => (
                            <FormItem>
                                <FormLabel>Bank Account</FormLabel>
                                <FormControl>
                                    <Input placeholder="Bank Account" {...field} />
                                </FormControl>
                                <FormMessage className="text-xs"/>
                            </FormItem>
                        )}/>

                        <FormField control={form.control} name="licenseNo" render={({field}) => (
                            <FormItem>
                                <FormLabel>License Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="License Number" {...field} />
                                </FormControl>
                                <FormMessage className="text-xs"/>
                            </FormItem>
                        )}/>

                        <div className="text-sm font-medium">
                            <h2>Authorize Status</h2>
                            {agency.authorizeStatus == "Approved" ?
                                (<p className="text-sm text-green-600">{agency.authorizeStatus}</p>)
                                : (<p className="text-sm text-red-600">{agency.authorizeStatus}</p>)
                            }
                        </div>
                    </div>

                    <div className="flex justify-end mt-10">
                        <Button type="submit">Save Change</Button>
                    </div>

                </form>
            </Form>
        </div>
    )

}
