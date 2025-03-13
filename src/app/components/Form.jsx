"use client";
import React, { useState, useEffect } from "react";
import UploadImage from "./UploadImage";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Form() {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [promptUsed, setPromptUsed] = useState("");
  const [modelUsed, setModelUsed] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [models, setModels] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch("/api/model-category");
        const data = await response.json();
        setModels(data);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };

    fetchModels();
  }, []);

  const onSave = async () => {
    if (!session) {
      signIn();
      return;
    }

    if (!imageUrl || !title) {
      console.warn("Please select an image and enter a title!");
      return;
    }

    setLoading(true);

    try {
      // ✅ Gửi dữ liệu post lên API backend
      const response = await fetch("/api/pins/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: 1, // session.user.id
          description: desc,
          prompt_used: promptUsed,
          mid: modelUsed,
          image_url: imageUrl, 
          title: title,
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Error creating post");

      console.log("Post saved successfully:", result);
      setLoading(false);
      router.push(`/`);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl max-w-3xl mx-auto">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <UploadImage setImageUrl={setImageUrl} />
        </div>

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
              onChange={(e) => setPromptUsed(e.target.value)}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="font-semibold">Model Used</label>
            <select
              onChange={(e) => setModelUsed(e.target.value)}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-300"
            >
              <option value="">Select a model</option>
              {models.map((model) => (
                <option key={model.mid} value={model.mid}>
                  {model.model_name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
