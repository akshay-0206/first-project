"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "@/store/slices/AuthSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { profile, isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      dispatch(fetchProfile());
    }
  }, [dispatch, isAuthenticated, router]);

  if (isLoading || !profile) {
    return <div className="p-6 text-gray-600 text-center">Loading profile....</div>;
  }
  console.log("Avatar path:", profile.avatar);
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Your Profile</h1>
      <div className="flex gap-6 items-start">
        <img
          src={`http://localhost:3001/${profile.avatar}`}
          alt="Profile"
          className="w-32 h-32 object-cover rounded-full border text-center"
        />
        <div className="space-y-4">
          <div>
            <span className="font-semibold text-gray-700">Name: </span>
            {profile.name}
          </div>
          <div>
            <span className="font-semibold text-gray-700">Email: </span>
            {profile.email}
          </div>
          <div>
            <span className="font-semibold text-gray-700">Phone: </span>
            {profile.phone}
          </div>
        </div>
      </div>
    </div>
  );
}
