"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, set } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import createTourist from "@/lib/createTourist";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  phone: z.string().min(10).max(10),
  email: z.string().email(),
  image: z.string().url(),
  citizenId: z.string().min(13).max(13),
  firstname: z.string().min(2).max(50),
  lastname: z.string().min(2).max(50),
  address: z.string().min(2).max(100),
  birthdate: z.date(),
  gender: z.enum(["Male", "Female", "Others"]),
  defaultPayment: z.string().min(2).max(50),
});

const TouristRegistrationPage = () => {
  const { data: session, status, update } = useSession();

  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      phone: "",
      email: "",
      image: "",
      citizenId: "",
      firstname: "",
      lastname: "",
      address: "",
      birthdate: new Date(),
      gender: "Others",
      defaultPayment: "Mobile Banking",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (step !== 3) {
      return;
    }
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const res = await createTourist({ data: values });
    console.log(res);
    if (!res.success) {
      toast({
        title: "Failed to create tourist",
        description: "Please try again",
      });
      return;
    }
    toast({
      title: "Tourist created",
      description: "You can now login",
    });
    router.push("/");
  }

  useEffect(() => {
    const googleUserStr = getCookie("googleUser");
    const googleUser = googleUserStr ? JSON.parse(googleUserStr) : null;
    // console.log(googleUserStr);
    if (googleUser) {
      form.reset({
        username: googleUser.id,
        email: googleUser.email,
        image: googleUser.image,
        gender: "Others",
        defaultPayment: "Mobile Banking",
      });
    }
  }, [form]);

  const [step, setStep] = useState(1);
  const handleNextStep = () => {
    // setStep((prevStep) => prevStep + 1);
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
    // setStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="absolute left-1/2  -translate-x-1/2  transform">
      <div className="mx-auto mt-8 w-[1000px] max-w-md rounded bg-white p-6 shadow-lg">
        <Form {...form}>
          <h1 className="mb-6 text-center text-2xl font-bold">
            Register as Tourist
          </h1>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {step === 1 && (
              <>
                <div className="flex flex-col gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone number</FormLabel>
                        <FormControl>
                          <Input placeholder="Phone number" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="citizenId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Citizen ID</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your citizen ID"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your first name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your last name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}

            {step >= 2 && (
              <>
                <div className="flex flex-col gap-6">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write your address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="birthdate"
                    render={({ field }) => (
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
                                  <CalendarIcon className="mr-2 h-4 w-4" />
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
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <Select
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                              <SelectItem value="Others">Others</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}

            <div className="mt-8 flex justify-between">
              {step === 1 && (
                <Link href={"/auth"}>
                  <Button type="button" variant="secondary">
                    Back
                  </Button>
                </Link>
              )}
              {step > 1 && (
                <Button
                  type="button"
                  onClick={handlePrevStep}
                  variant="secondary"
                >
                  Previous
                </Button>
              )}
              {step < 2 ? (
                <Button type="button" onClick={handleNextStep} className="">
                  Next
                </Button>
              ) : (
                <Button type="submit" id="submitBtn" onClick={handleNextStep}>
                  Submit
                </Button>
              )}
            </div>
          </form>
          {/* <Button onClick={() => console.log(form.getValues())}>Log</Button> */}
        </Form>
      </div>
    </div>
  );
};

export default TouristRegistrationPage;
