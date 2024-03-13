'use client';
import { useUserStore } from "@/context/store";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
    useEffect(() => {
        const response = new URLSearchParams(window.location.search).get('response')
        localStorage.removeItem("googleUser");
        if(response){
            // localStorage.setItem('response', response)
            const user = JSON.parse(response)
            useUserStore.setState({id: user.id, token: user.token})
        }
        redirect('/')
    }
    , [])
    return (
        <div>
        </div>
    )
}