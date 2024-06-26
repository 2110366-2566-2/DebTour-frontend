import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { CustomQueryProvider } from "../context/CustomQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Deb tour",
  description: "The most convenience tourist-agency platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nextAuthSession = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${inter.className} relative h-screen`}>
        <NextAuthProvider session={nextAuthSession}>
          <CustomQueryProvider>
            <Navbar />
            {children}
            <Toaster />
          </CustomQueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
