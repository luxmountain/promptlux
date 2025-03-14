"use client";
import React, { useState } from "react";

const InputComment = ({ postId, userId, onNewComment }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendComment = async () => {
    if (!message.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/comment/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: userId,
          pid: postId,
          comment: message,
          comment_replied_to_id: null,
        }),
      });

      if (response.ok) {
        const newComment = await response.json();
        onNewComment(newComment); // Cập nhật comment ngay lập tức
        setMessage(""); // Xóa nội dung sau khi gửi
      } else {
        console.error("Failed to post comment");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-lg rounded-2xl">
      <textarea
        placeholder="Add a comment..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={2}
        className="w-full p-3 pr-12 text-sm bg-white border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {message.trim().length > 0 && (
        <button
          onClick={handleSendComment}
          disabled={loading}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-white bg-red-500 rounded-full hover:bg-red-700 disabled:bg-gray-400"
        >
          {loading ? "⏳" : "🚀"}
        </button>
      )}
    </div>
  );
};

export default InputComment;
