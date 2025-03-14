"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Avatar } from "@mui/material";
import { useSession } from "next-auth/react";
import ReadComment from "../../components/pin-detail/input-comment";
import PostActions from "../../components/pin-detail/actions";
import Comment from "../../components/pin-detail/comment";
import Picture from "../../components/pin-detail/picture";
import LoginModal from "../../components/auth/LoginModal"; // Import modal login

function PostDetail() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id: postId } = useParams(); // Lấy postId từ URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State cho login modal

  useEffect(() => {
    if (status === "loading") return; // Chờ session load xong
    if (!session) {
      setIsLoginModalOpen(true); // Mở modal đăng nhập nếu chưa đăng nhập
      return;
    }

    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/pins/${postId}`);
        if (!res.ok) throw new Error("Không thể tải bài viết");

        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [session, status, postId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="p-8 bg-white flex justify-center overflow-y-auto">
        <div className="flex gap-4 w-full max-w-5xl">
          <button
            onClick={() => router.back()}
            className="cursor-pointer flex items-center justify-center w-12 h-12 rounded-full transition hover:bg-gray-200"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path d="M8.41 4.59a2 2 0 1 1 2.83 2.82L8.66 10H21a2 2 0 0 1 0 4H8.66l2.58 2.59a2 2 0 1 1-2.82 2.82L1 12z"></path>
            </svg>
          </button>

          <div className="flex rounded-3xl gap-4 overflow-hidden w-full">
            <Picture imageUrl={post?.image_url || "https://via.placeholder.com/500"} />

            <div className="w-1/2 flex flex-col gap-4 p-4">
              <PostActions />
              <div className="space-y-2">
                <div className="">
                  <h6 className="text-lg font-semibold">{post?.title || "Không có tiêu đề"}</h6>
                </div>
                <div className="flex items-center gap-2">
                  <Avatar src={post?.user?.avatar_image || "/avatar-small.png"} className="w-6 h-6" />
                  <span className="font-bold">{post?.user?.username || "Người dùng"}</span>
                </div>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="font-bold">{post?.comments?.length || 0} Comments</span>
              </div>
              {post?.comments?.map((comment) => (
                <Comment key={comment.id} content={comment.content} />
              ))}
              <ReadComment />
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}

export default PostDetail;
