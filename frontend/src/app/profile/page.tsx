"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "@/store/slices/AuthSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/navigation";

function ProfilePage() {
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
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 text-lg">
        Loading your profile...
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-blue-100 to-purple-200 py-15 px-6 md:px-16">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-10">
          Your Profile
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-shrink-0">
            <img
              src={`http://localhost:3001/${profile.avatar}`}
              alt="Profile"
              className="w-40 h-40 object-cover rounded-full border-4 border-purple-300 shadow-lg"
            />
          </div>

          <div className="flex-1 space-y-4 text-lg text-gray-700">
            <div>
              <span className="font-semibold text-purple-600">Name:</span>{" "}
              {profile.name}
            </div>
            <div>
              <span className="font-semibold text-purple-600">Email:</span>{" "}
              {profile.email}
            </div>
            <div>
              <span className="font-semibold text-purple-600">Phone:</span>{" "}
              {profile.phone}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
