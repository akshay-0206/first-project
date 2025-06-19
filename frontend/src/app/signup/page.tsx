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
import { useState } from "react";
import { toast } from "react-toastify";

function SignupPage() {
  const form = useForm<SignupData>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phone: "",
    },
  });

  const [avatar, setAvatar] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const MAX_FILE_SIZE_MB = 2;
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Only JPG, PNG, or WEBP images are allowed.");
      setAvatar(null);
      return;
    }

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > MAX_FILE_SIZE_MB) {
      toast.error("File size must be less than 2MB.");
      setAvatar(null);
      return;
    }

    setAvatar(file);
  };
  const onSubmit = async (values: SignupData) => {
    if (!avatar) {
      toast.error("Please upload a valid profile image under 2MB.");
      return;
    }

    const fileSizeMB = avatar.size / (1024 * 1024);
    if (fileSizeMB > 2) {
      toast.error("File size must be less than 2MB.");
      return;
    }

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("phone", values.phone);
    formData.append("avatar", avatar);

    try {
      const data = await dispatch(handleRegister(formData as any)).unwrap();
      toast.success("Account created successfully!");
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
      <main className="flex-grow flex justify-center items-center px-4 py-10">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-purple-600 mb-8">
            Create Account
          </h2>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-2 gap-6"
            >
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name:</FormLabel>
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
                      <FormLabel>Email:</FormLabel>
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
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone:</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="9876543210" {...field} />
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
                      <FormLabel>Password:</FormLabel>
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
              </div>
              <div className="col-span-2 space-y-4">
                <div>
                  <FormLabel>Profile Image:</FormLabel>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full py-3 bg-purple-600 hover:bg-purple-800 text-white font-bold rounded-xl transition duration-200"
                >
                  Sign Up
                </Button>
              </div>
            </form>
          </Form>

          <p className="mt-4 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-purple-600 hover:underline cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </main>
    </div>
  );
}

export default SignupPage;
