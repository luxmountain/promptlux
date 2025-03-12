"use client";
import { useState } from "react";
import { CloudUploadOutlined } from "@mui/icons-material";

function UploadImage({ setFile }) {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div className="flex flex-col items-center border-2 border-dashed border-gray-300 rounded-xl p-6 w-full h-[300px] justify-center cursor-pointer bg-gray-100 hover:bg-gray-200 transition">
      <label htmlFor="image-upload" className="flex flex-col items-center">
        {!selectedFile ? (
          <div className="text-center text-gray-600">
            <CloudUploadOutlined className="text-5xl text-gray-500 mb-2" />
            <p className="font-semibold">Choose a file or drag & drop</p>
            <p className="text-sm text-gray-500 mt-1">
              JPG under 20MB or MP4 under 200MB
            </p>
          </div>
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
          accept="image/jpeg, image/png, video/mp4"
          onChange={(e) => {
            setFile(e.target.files[0]);
            setSelectedFile(e.target.files[0]);
          }}
          hidden
        />
      </label>
    </div>
  );
}

export default UploadImage;
