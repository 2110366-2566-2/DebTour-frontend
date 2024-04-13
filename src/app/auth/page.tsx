"use client";

import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <main className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
      <div className=" w-[630px] rounded-md border bg-white px-12 py-6 shadow-lg">
        <p className="my-6 text-center text-3xl font-bold italic text-indigo-700">
          DebTour
        </p>

        <div>
          <div className="mx-auto my-6 grid w-full max-w-md items-center gap-6">
            <p className="text-center font-bold">Get started with</p>
            <button
              className="mx-auto flex w-4/5 items-center rounded-full border bg-white px-6 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none"
              onClick={() => {
                signIn("google", { callbackUrl: "/" });
              }}
            >
              <FcGoogle className="h-6 w-6" />
              <span className="mx-auto">Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
