"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginData, LoginSchema } from "@/components/Auth/Schema/LoginSchema";
import { useAppDispatch } from "@/store/store";
import { handleLogin } from "@/store/slices/AuthSlice";


export default function LoginPage() {
  const form = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async(values: LoginData) => {
    try {
      await dispatch(handleLogin(values)).unwrap();
      router.push("/home");
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className=" bg-blue-500 w-full hover:bg-blue-700"
            >
              Log In
            </Button>
          </form>
        </Form>
        <br />
        <p className="text-center">Don't have an account?</p>
        <div className="w-full text-center">
          <a
            className="text-blue-600 font-bold hover:text-blue-900 cursor-pointer"
            onClick={() => router.push("/signup")}
          >
            SignUp
          </a>
        </div>
      </div>
    </div>
  );
}
