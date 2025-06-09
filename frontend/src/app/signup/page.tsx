"use client";

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
import {
  SignupData,
  SignupSchema,
} from "@/components/Auth/Schema/RegisterSchema";
import { useAppDispatch } from "@/store/store";
import { handleRegister } from "@/store/slices/AuthSlice";

export default function SignupPage() {
  const form = useForm<SignupData>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phone: "",
    },
  });

  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async (values: SignupData) => {
    try {
      const data = await dispatch(handleRegister(values)).unwrap();
      router.push("/login");
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="string" placeholder="9876543210" {...field} />
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
              className=" bg-green-500 w-full hover:bg-green-700"
            >
              SignUp
            </Button>
          </form>
        </Form>
        <br />
        <p className="text-center">Already have an account?</p>
        <div className="text-center">
          <a
            className="text-blue-600 font-bold hover:text-blue-900 cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
