"use client";
import { useState } from "react";
import { CloudUploadOutlined } from "@mui/icons-material";

function UploadImage({ setImageUrl }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setUploading(true);

    // ✅ Gửi file lên Imgur API
    const imageUrl = await uploadImageToImgur(file);
    setUploading(false);

    if (imageUrl) {
      setImageUrl(imageUrl); // Trả về link ảnh cho PostForm
    }
  };

  const uploadImageToImgur = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
  
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Upload failed");
  
      return data.link; // ✅ URL ảnh từ Imgur
    } catch (error) {
      console.error("Imgur upload error:", error);
      return null;
    }
  };

  return (
    <div className="flex flex-col items-center border-2 border-dashed border-gray-300 rounded-xl p-6 w-full h-[300px] justify-center cursor-pointer bg-gray-100 hover:bg-gray-200 transition">
      <label htmlFor="image-upload" className="flex flex-col items-center">
        {!selectedFile ? (
          <div className="text-center text-gray-600">
            <CloudUploadOutlined className="text-5xl text-gray-500 mb-2" />
            <p className="font-semibold">Choose a file or drag & drop</p>
            <p className="text-sm text-gray-500 mt-1">JPG or MP4</p>
          </div>
        ) : uploading ? (
          <p className="text-blue-500">Uploading...</p>
        ) : (
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Preview"
            className="object-cover rounded-lg h-[250px] w-full"
          />
        )}
        <input
          type="file"
          id="image-upload"
          accept="image/jpeg, image/png"
          onChange={handleFileChange}
          hidden
        />
      </label>
    </div>
  );
}

export default UploadImage;