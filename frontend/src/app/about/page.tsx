"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

function AboutPage() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-blue-100 to-purple-200 py-15 px-6 md:px-16">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-purple-600 mb-4">About Us</h1>
        </div>
        <div>
          <p className="text-gray-700 text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris. Nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore. Eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident. Sunt in
            culpa qui officia deserunt mollit anim id est laborum. Curabitur
            pretium tincidunt lacus. Nulla gravida orci a odio. Integer a nibh
            et quam pharetra vulputate in non orci. Phasellus nec sem in justo
            pellentesque facilisis.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;