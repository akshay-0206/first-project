"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [dispatch, isAuthenticated, router]);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-blue-100 to-purple-200 py-15 px-6 md:px-16">
      <div
        className="max-w-3xl mx-auto bg-white p-8 rounded-xl 
      shadow-lg"
      >
        <h1 className="text-4xl font-bold text-center text-purple-600 mb-4">
          Welcome to My App!
        </h1>
        <p className="text-gray-700 text-justify">
          Feel free to explore. You can find more information in the About
          setion. Can contact me in the Contact section.
        </p>
      </div>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-10">
        <h1 className="text-4xl font-bold text-center text-purple-600 mb-4">
          Follow me on social media!
        </h1>
        <div className="flex justify-center">
          <a
            className="p-4 text-blue-800 text-xl"
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF />
          </a>
          <a
            className="p-4 text-sky-500 text-xl"
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="hover: transition" />
          </a>
          <a
            className="p-4 text-blue-700 text-xl"
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn />
          </a>
          <a
            className="p-4 text-pink-500 text-xl"
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </div>
  );
}

export default HomePage;