import React, { useState } from "react";
import { CloudUploadOutlined } from "@mui/icons-material";

function UploadImage({ setFile }) {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div className="h-[450px] bg-[#f5f5f5] rounded-lg flex justify-center items-center">
      <label
        className="w-full h-full flex flex-col justify-center items-center 
        cursor-pointer border-2 border-gray-300 border-dashed rounded-lg text-gray-600"
      >
        {!selectedFile ? (
          <div className="flex flex-col items-center">
            <CloudUploadOutlined className="text-4xl text-gray-500 mb-2" />
            <h2 className="font-semibold text-gray-700">Click to Upload</h2>
          </div>
        ) : (
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="selected-preview"
            className="object-cover h-[90%] w-auto rounded-lg"
          />
        )}

        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={(e) => {
            setFile(e.target.files[0]);
            setSelectedFile(e.target.files[0]);
          }}
        />
      </label>
    </div>
  );
}

export default UploadImage;
