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
import { LoginData, LoginSchema } from "@/components/Auth/Schema/LoginSchema";
import { useAppDispatch } from "@/store/store";
import { handleLogin } from "@/store/slices/AuthSlice";
import { toast } from "react-toastify";

function LoginPage() {
  const form = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async (values: LoginData) => {
    try {
      await dispatch(handleLogin(values)).unwrap();
      toast.success("Login successful!");
      router.push("/home");
    } catch (error) {
      toast.error("Invalid credentials.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
      <main className="flex-grow flex justify-center items-center px-4 py-10">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-purple-600 mb-8">
            Login
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full py-3 bg-purple-600 hover:bg-purple-800 text-white font-bold rounded-xl transition duration-200"
              >
                Log In
              </Button>
            </form>
          </Form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => router.push("/signup")}
              className="text-purple-600 hover:underline ncursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;