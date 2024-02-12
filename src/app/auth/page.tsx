import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <main className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
      <Tabs
        defaultValue="login"
        className=" w-[630px] rounded-md border bg-white shadow-lg"
      >
        <p className="my-6 text-center text-3xl font-bold italic text-indigo-700">
          DebTour
        </p>

        <TabsList className="mx-auto flex w-[150px] justify-center">
          <TabsTrigger value="login">Log in</TabsTrigger>
          <TabsTrigger value="signup">Sign up</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <div className="mx-auto my-6 grid w-full max-w-md items-center gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Email" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" placeholder="Password" />
            </div>

            <Button className="mx-auto my-4 w-full max-w-md items-center">
              Log in
            </Button>

            <p className="text-center font-bold">Or</p>

            <button className="mx-auto flex w-4/5 items-center rounded-full border bg-white px-6 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none">
              <FcGoogle className="h-6 w-6" />
              <span className="mx-auto">Continue with Google</span>
            </button>
          </div>
        </TabsContent>
        <TabsContent value="signup">Change your password here.</TabsContent>
      </Tabs>
    </main>
  );
};

export default Login;
