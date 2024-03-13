'use client';
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
    useEffect(() => {
        const googleUser = new URLSearchParams(window.location.search).get('googleUser')
        if(googleUser){
            localStorage.setItem('googleUser', googleUser)
        }
        redirect('/auth/signup/')
    }
    , [])
    return (
        <div>
        </div>
    )
}