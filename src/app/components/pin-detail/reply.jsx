"use client";
import { useState } from "react";

export default function Reply({ parentCommentId, pid, userId, onReplyAdded }) {
  const [replyText, setReplyText] = useState("");

  const handleReplySubmit = async () => {
    if (!replyText.trim()) return;
    
    try {
      const res = await fetch(`/api/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: userId,
          pid: pid,
          comment: replyText,
          comment_replied_to_id: parentCommentId, 
        }),
      });

      if (!res.ok) throw new Error("Failed to post reply");

      const newReply = await res.json();
      
      if (onReplyAdded) onReplyAdded(newReply.comment);

      setReplyText("");
      window.location.reload();
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  };

  return (
    <div className="ml-8 mt-2">
      <div className="flex">
        <input
          type="text"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          className="border p-1 flex-1 rounded-md"
          placeholder="Write a reply..."
        />
        <button
          onClick={handleReplySubmit}
          className="bg-blue-500 text-white px-3 py-1 rounded-md ml-2 cursor-pointer"
        >
          Reply
        </button>
      </div>
    </div>
  );
}
