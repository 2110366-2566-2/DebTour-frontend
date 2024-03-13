'use client';
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
    useEffect(() => {
        const response = new URLSearchParams(window.location.search).get('response')
        if(response){
            localStorage.setItem('response', response)
        }
        redirect('/')
    }
    , [])
    return (
        <div>
        </div>
    )
}