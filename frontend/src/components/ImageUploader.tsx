"use client";

import { useState } from "react";

export default function ImageUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploaded, setUploaded] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const selectedPreviews = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );

    setFiles((prev) => [...prev, ...selectedFiles]);
    setPreviews((prev) => [...prev, ...selectedPreviews]);
    setUploaded(false); 
  };

  const handleDelete = (index: number) => {
    const newFiles = [...files];
    const newPreviews = [...previews];

    URL.revokeObjectURL(newPreviews[index]);

    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);

    setFiles(newFiles);
    setPreviews(newPreviews);
    setUploaded(false);

    if (newFiles.length === 0) {
      const input = document.getElementById("file-input") as HTMLInputElement;
      if (input) input.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const res = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Upload response:", data);

      if (res.ok) {
        setUploaded(true);
        setFiles([]);
        setPreviews([]);

        const input = document.getElementById("file-input") as HTMLInputElement;
        if (input) input.value = "";
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border border-gray-300 rounded-xl shadow-lg bg-white">
      <h2 className="text-xl font-semibold mb-4 text-center text-blue-700">
        Upload Images
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label
          htmlFor="file-input"
          className="block w-full text-center p-6 border-2 border-dashed border-blue-400 rounded-lg cursor-pointer hover:border-blue-800 transition"
        >
          <p className="text-gray-600 font-medium">
            Click here to choose{" "}
            {previews.length > 0 ? "more images" : "image(s)"}
          </p>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            multiple
            onChange={handleChange}
            className="hidden"
          />
        </label>

        {previews.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Preview ${index}`}
                  className="w-32 h-32 object-cover rounded-lg border shadow"
                />
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-opacity opacity-0 group-hover:opacity-100"
                  aria-label="Delete image"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Upload
        </button>

        {uploaded && previews.length === 0 && (
          <p className="text-green-600 font-semibold text-center">
            ✅ Uploaded Successfully!
          </p>
        )}
      </form>
    </div>
  );
}
