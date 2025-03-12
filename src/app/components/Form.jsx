"use client";
import React, { useState } from "react";
import UploadImage from "./UploadImage";
import { useSession, signIn } from "next-auth/react";
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

  const onSave = async () => {
    if (!session) {
      signIn();
      return;
    }

    if (!file || !title) {
      console.warn("Please select an image and enter a title!");
      return;
    }

    setLoading(true);
    uploadFile();
  };

  const uploadFile = async () => {
    console.log("Uploading file:", file);
    savePost("IMAGE_URL_PLACEHOLDER");
  };

  const savePost = async (imageUrl) => {
    const postData = {
      title,
      desc,
      link,
      image: imageUrl,
      userName: session?.user?.name,
      email: session?.user?.email,
      userImage: session?.user?.image,
      id: postId,
    };

    try {
      await setDoc(doc(db, "pinterest-post", postId), postData);
      console.log("Saved");
      setLoading(false);
      router.push(`/`);
    } catch (error) {
      console.error("Error saving post:", error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Create a new Pin</h2>
        <button
          onClick={onSave}
          className="bg-red-500 text-white font-semibold px-5 py-2 rounded-lg hover:bg-red-600 transition"
          disabled={loading}
        >
          {loading ? (
            <Image src="/loading-indicator.png" width={25} height={25} alt="loading" className="animate-spin" />
          ) : (
            <span>Save</span>
          )}
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Image Upload */}
        <div className="md:col-span-1">
          <UploadImage setFile={setFile} />
        </div>

        {/* Form Inputs */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <div>
            <label className="font-semibold">Title</label>
            <input
              type="text"
              placeholder="Add a title"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="font-semibold">Description</label>
            <textarea
              placeholder="Add a detailed description"
              onChange={(e) => setDesc(e.target.value)}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-300"
              rows={4}
            />
          </div>

          <div>
            <label className="font-semibold">Prompt Used</label>
            <input
              type="text"
              placeholder="Enter prompt used"
              onChange={(e) => setLink(e.target.value)}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="font-semibold">Model Used</label>
            <select className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-300">
              <option>Choose a AI model</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Tags</label>
            <input
              type="text"
              placeholder="Search for a tag"
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* <div className="text-blue-500 cursor-pointer mt-2 hover:underline">
            More options
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Form;
