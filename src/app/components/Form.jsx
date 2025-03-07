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
  const [file, setFile] = useState(null); // Giữ file ảnh để upload sau này
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const db = getFirestore(app);
  const postId = Date.now().toString();

  // Xử lý khi bấm nút Save
  const onSave = async () => {
    if (!session) {
      signIn(); // Nếu chưa đăng nhập, yêu cầu đăng nhập
      return;
    }

    if (!file || !title) {
      console.warn("Vui lòng chọn ảnh và nhập tiêu đề!");
      return;
    }

    setLoading(true);
    uploadFile();
  };

  // 🛑 Ở đây chưa có backend xử lý upload, chỉ log ra file
  const uploadFile = async () => {
    console.log("Chuẩn bị upload file:", file);

    // Sau này bạn có thể thêm code upload lên Firebase Storage hoặc backend API tại đây

    savePost("IMAGE_URL_PLACEHOLDER"); // Tạm thời truyền placeholder
  };

  // Lưu dữ liệu bài post vào Firestore
  const savePost = async (imageUrl) => {
    const postData = {
      title,
      desc,
      link,
      image: imageUrl, // Sẽ thay bằng URL sau khi upload thành công
      userName: session?.user?.name,
      email: session?.user?.email,
      userImage: session?.user?.image,
      id: postId,
    };

    try {
      await setDoc(doc(db, "pinterest-post", postId), postData);
      console.log("Saved");
      setLoading(false);
      router.push(`/`); // Chuyển hướng về trang cá nhân
    } catch (error) {
      console.error("Lỗi khi lưu bài đăng:", error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-10 md:p-16 rounded-2xl max-w-4xl mx-auto shadow-md">
      {/* Nút Save */}
      <div className="flex justify-end mb-6">
        <button
          onClick={onSave}
          className="bg-red-500 p-2 text-white font-semibold px-4 rounded-lg flex items-center justify-center"
          disabled={loading}
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
        {/* Upload ảnh */}
        <div className="flex flex-col gap-4">
          <UploadImage setFile={setFile} />
          {file && (
            <p className="text-gray-500 text-sm">
              File đã chọn: {file.name}
            </p>
          )}
        </div>

        {/* Form nhập nội dung */}
        <div className="col-span-2">
          <div className="w-full">
            {/* Tiêu đề */}
            <input
              type="text"
              placeholder="Nhập tiêu đề"
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl md:text-3xl font-bold w-full outline-none border-b-2 border-gray-300 placeholder-gray-400 pb-2"
            />
            <p className="text-xs text-gray-400 mb-6">
              40 ký tự đầu tiên sẽ hiển thị trên feed.
            </p>

            {/* Thông tin người dùng */}
            <UserTag user={session?.user} />

            {/* Mô tả */}
            <textarea
              placeholder="Mô tả về bài đăng"
              onChange={(e) => setDesc(e.target.value)}
              className="w-full outline-none border-b-2 border-gray-300 placeholder-gray-400 text-sm md:text-base py-4"
            />

            {/* Link đích */}
            <input
              type="text"
              placeholder="Thêm liên kết đích (tùy chọn)"
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
