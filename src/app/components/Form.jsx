"use client";
import React, { useState } from "react";
import UploadImage from "./UploadImage";
import { useSession } from "next-auth/react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import UserTag from "./UserTag";
import app from "../Shared/firebaseConfig";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Form() {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const db = getFirestore(app);
  const postId = Date.now().toString();

  const onSave = () => {
    if (!file || !title) return;
    setLoading(true);
    uploadFile();
  };

  const uploadFile = () => {
    
  };

  return (
    <div className="bg-white p-10 md:p-16 rounded-2xl max-w-4xl mx-auto shadow-md">
      {/* Save Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={onSave}
          className="bg-red-500 p-2 text-white font-semibold px-4 rounded-lg flex items-center justify-center"
        >
          {loading ? (
            <Image
              src="/loading-indicator.png"
              width={25}
              height={25}
              alt="loading"
              className="animate-spin"
            />
          ) : (
            <span>Save</span>
          )}
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Image Upload Section */}
        <div className="flex justify-center">
          <UploadImage setFile={setFile} />
        </div>

        {/* Form Fields */}
        <div className="col-span-2">
          <div className="w-full">
            {/* Title Input */}
            <input
              type="text"
              placeholder="Add your title"
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl md:text-3xl font-bold w-full outline-none border-b-2 border-gray-300 placeholder-gray-400 pb-2"
            />
            <p className="text-xs text-gray-400 mb-6">
              The first 40 characters are what usually show up in feeds
            </p>

            {/* User Info */}
            <UserTag user={session?.user} />

            {/* Description */}
            <textarea
              placeholder="Tell everyone what your pin is about"
              onChange={(e) => setDesc(e.target.value)}
              className="w-full outline-none border-b-2 border-gray-300 placeholder-gray-400 text-sm md:text-base py-4"
            />

            {/* Destination Link */}
            <input
              type="text"
              placeholder="Add a Destination Link"
              onChange={(e) => setLink(e.target.value)}
              className="w-full outline-none border-b-2 border-gray-300 placeholder-gray-400 text-sm md:text-base py-4 mt-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
