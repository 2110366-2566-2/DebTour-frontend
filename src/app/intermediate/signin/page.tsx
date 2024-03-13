'use client';
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
    const cookieStore = cookies()
    useEffect(() => {
        const response = new URLSearchParams(window.location.search).get('response')
        localStorage.removeItem("googleUser");
        if(response){
            // localStorage.setItem('response', response)
            // user is {id: user.id, token: user.token}
            const user = JSON.parse(response)
            cookieStore.set({name:'id', value:user.id, httpOnly: true})
            cookieStore.set({name:'token', value:user.token, httpOnly: true})
        }
        redirect('/')
    }
    , [])
    return (
        <div>
        </div>
    )
}