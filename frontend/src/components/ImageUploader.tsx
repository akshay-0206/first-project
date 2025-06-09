"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function ImageUploader() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setImagePreview(null);
    const input = document.getElementById("file-upload") as HTMLInputElement;
    if (input) input.value = "";
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 border border-gray-300 rounded-lg shadow-md bg-white max-w-sm mx-auto mt-8">
      <label
        htmlFor="file-upload"
        className="w-full text-center p-6 border-2 border-dashed border-blue-400 rounded-md cursor-pointer hover:border-blue-600 transition-colors"
      >
        <p className="text-gray-700 font-medium">
          {selectedFile ? selectedFile.name : "Click here to choose an image"}
        </p>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </label>

      {imagePreview && (
        <div className="relative">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-full border border-gray-300 shadow"
          />
          <button
            onClick={handleClear}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
            aria-label="Remove image"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
