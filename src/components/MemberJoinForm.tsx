"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import memberFormSchema from "@/model/memberFormSchema";
import joinTour from "@/lib/joinTour";
import { toast } from "@/components/ui/use-toast";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function MemberJoinForm({ tourId }: { tourId: string }) {
  const form = useForm<z.infer<typeof memberFormSchema>>({
    resolver: zodResolver(memberFormSchema),
    defaultValues: {
      joinedMembers: [
        {
          memberId: 0,
          firstName: "",
          lastName: "",
          age: 0,
        },
      ],
      tourId: parseInt(tourId),
      touristUsername: "tempUser",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "joinedMembers",
  });

  async function onSubmit(values: z.infer<typeof memberFormSchema>) {
    // console.log(values);
    const res = await joinTour(values);
    if (!res.success) {
      toast({ title: "Failed to join tour", description: "Please try again" });
      return;
    }
    toast({
      title: "Successfully joined tour",
      description: "You are now a member of this tour",
    });
  }

  const { data: session } = useSession();
  const token = session?.user.serverToken;
  const username = session?.user.id;

  const backendUrl = process.env.BACKEND_URL;
  const frontendUrl = "https://deb-tour.vercel.app";

  // console.log("process.env.BACKEND_URL",process.env.BACKEND_URL)
  // console.log("process.env.FRONT_URL", process.env.FRONT_URL)
  // console.log("back", backendUrl);
  // console.log("front", frontendUrl);

  const successUrlPath = `${frontendUrl}/payment-response/success`;
  const cancelUrlPath = `${frontendUrl}/payment-response/cancel`;

  const apiUrl = `${backendUrl}/api/v1/transactionPayments?successURL=${successUrlPath}&cancelURL=${cancelUrlPath}`;

  const [checkoutUrl, setCheckoutUrl] = useState("");
  const [tourAmount, setTourAmount] = useState(0);

  useEffect(() => {
    const getTourAmountAndCheckout = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/v1/tours/${tourId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const price = res.data.data.price;
        setTourAmount(price);

        await fetchCheckoutUrl();
      } catch (err) {
        console.log("Error:", (err as AxiosError).message);
      }
    };

    const fetchCheckoutUrl = async () => {
      try {
        const res = await axios.post(
          apiUrl,
          {
            amount: tourAmount,
            method: "debit",
            tourId: Number(tourId),
            touristUsername: username,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setCheckoutUrl(res.data.data);
      } catch (err) {
        console.log("Error:", (err as AxiosError).message);
      }
    };

    if (token) {
      getTourAmountAndCheckout();
    }
  }, [apiUrl, backendUrl, token, tourAmount, tourId, username]);

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="container mt-8 flex w-full flex-col justify-center"
    >
      <table className="mx-auto w-full min-w-[400px] table-fixed border-collapse">
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-trash-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
                      fill="#474747"
                    ></path>
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        onClick={() => {
          append({
            memberId: 0,
            firstName: "",
            lastName: "",
            age: 0,
          });
        }}
        className="ml-auto mt-12 w-[120px]"
        variant={"outline"}
      >
        Add Member
      </Button>

      <div className="mt-32 flex w-full justify-between">
        <Link
          className={buttonVariants({ variant: "outline" })}
          href={`/tourist/tours/${tourId}`}
        >
          Back
        </Link>

        <Button
          type="button"
          disabled={!checkoutUrl}
          onClick={() => {
            window.location.href = checkoutUrl;
          }}
        >
          Proceed to Payment
        </Button>
      </div>
    </form>
  );
}
