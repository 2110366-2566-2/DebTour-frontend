import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import {Toaster} from "@/components/ui/toaster";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import NextAuthProvider from "@/providers/NextAuthProvider";
import {cookies} from "next/headers";
import {signOut} from "next-auth/react";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Deb tour",
    description: "",
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const nextAuthSession = await getServerSession(authOptions)
    const cookieStore = cookies()
    const role = cookieStore.get('role')

    async function handleSignout() {
        "use server"
        const cookieStore = cookies();
        cookieStore.delete("username");
        cookieStore.delete("role");
        cookieStore.delete("token");
    };

    return (
        <html lang="en">
        <body className={`${inter.className} relative h-screen`}>
        <NextAuthProvider session={nextAuthSession}>
            <Navbar userRole={role ? role.value : "guest"} handleSignout={handleSignout}/>
            {children}
            <Toaster/>
        </NextAuthProvider>
        </body>
        </html>
    );
}
