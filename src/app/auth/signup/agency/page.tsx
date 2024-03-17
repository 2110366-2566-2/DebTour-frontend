"use client";

import { useState } from "react";
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
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import createAgency from "@/lib/createAgency";
import { format, set } from "date-fns";

const formSchema = z.object({
  agencyName: z.string(),
  approveTime: z.date(),
  authorizeAdminId: z.number(),
  authorizeStatus: z.string(),
  bankAccount: z.string(),
  email: z.string().email(),
  image: z.string().url(),
  licenseNo: z.string(),
  phone: z.string().min(9).max(10),
  role: z.string(),
  username: z.string(),
});

const AgencyRegisterPage = () => {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agencyName: "",
      approveTime: new Date(),
      authorizeAdminId: 0,
      authorizeStatus: "",
      bankAccount: "",
      email: "",
      image: "",
      licenseNo: "",
      phone: "0000000000",
      role: "Agency",
      username: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log("trash language");
    // console.log(values);
    const res = await createAgency({ data: values });
    console.log(res);
    if (!res.success) {
      toast({
        title: "Failed to create Agency",
        description: "Please try again",
      });
      return;
    }
    toast({
      title: "Agency created",
      description: "You can now login",
    });
    router.push("/");
  }

  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  useEffect(() => {
    console.log("First form values", form.getValues());
    const googleUserStr = getCookie("googleUser");
    const googleUser = googleUserStr ? JSON.parse(googleUserStr) : null;
    console.log(googleUserStr);
    if (googleUser) {
      form.reset({
        username: googleUser.id,
        email: googleUser.email,
        image: googleUser.image,
        agencyName: "",
        approveTime: new Date(),
        authorizeAdminId: 0,
        authorizeStatus: "",
        bankAccount: "",
        licenseNo: "",
        phone: "0000000000",
        role: "Agency",
      });
    } else {
      form.reset({
        agencyName: "",
        approveTime: new Date(),
        authorizeAdminId: 0,
        authorizeStatus: "",
        bankAccount: "",
        email: "",
        image: "",
        licenseNo: "",
        phone: "0000000000",
        role: "Agency",
        username: "",
      });
    }
    console.log("Form values", form.getValues());
  }, []);

  // mental health checker function
  const checkMentalHealth = () => {
    console.log(form.getValues());
  };

  return (
    <div className="absolute left-1/2  -translate-x-1/2  transform">
      <div className="mx-auto mt-8 w-[1000px] max-w-md rounded bg-white p-6 shadow-lg">
        <Form {...form}>
          <h1 className="mb-6 text-center text-2xl font-bold">
            Register as Agency
          </h1>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* {step === 1 && (
              <>
                <div className="flex flex-col gap-6">
                  <FormField
                    control={form.control}
                    name="agencyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Username" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input placeholder="password" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm password</FormLabel>
                        <FormControl>
                          <Input placeholder="password" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )} */}

            {step === 1 && (
              <>
                <div className="flex flex-col gap-6">
                  <FormField
                    control={form.control}
                    name="agencyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your agency's name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your phone number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bankAccount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>BankAccount</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Write your agency's bank account"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  {/* <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Biography</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Write your biography here" />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  /> */}

                  {/* <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Account</FormLabel>
                        <div className="flex gap-4">
                          <FormControl>
                            <Select>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="---" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="A">A</SelectItem>
                                <SelectItem value="B">B</SelectItem>
                                <SelectItem value="C">C</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>

                          <FormControl>
                            <Input placeholder="Account number" {...field} />
                          </FormControl>
                        </div>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  /> */}

                  {/* <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write your agency's address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  /> */}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="flex flex-col gap-6">
                  <FormField
                    control={form.control}
                    name="licenseNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company License Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your agency's License Number"
                            {...field}
                            value={field.value || ""}
                          />
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
                <></>
              )}
              {step === 2 && (
                <Button type="submit" onClick={checkMentalHealth}>
                  Register
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AgencyRegisterPage;
