"use server";
import {cookies} from "next/headers";

export default async function getUser() {
    const username = cookies().get('username')?.value
    const token = cookies().get('token')?.value
    if (!username) {
        return
    }
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/users/${username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to get user");
    }
    return response.json();
}