"use client";

import ImageUploader from "@/components/ImageUploader";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow text-center p-4">
      <h1 className="text-2xl font-semibold italic">
        Hello, Welcome to my-app!
      </h1>
      <ImageUploader />
      <br />
      <h1 className="text-2xl font-semibold italic">Thanks</h1>
    </div>
  );
}
