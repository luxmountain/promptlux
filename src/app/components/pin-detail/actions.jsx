"use client";
import React, { useEffect, useState } from "react";

const PostActions = ({ postId, userId, imageUrl }) => {
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isShareClicked, setIsShareClicked] = useState(false);
  const [isDownloadClicked, setIsDownloadClicked] = useState(false);
  const [isSaveClicked, setIsSaveClicked] = useState(false);
  const fetchLikes = async () => {
    try {
      const response = await fetch("/api/like/getLike", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pid: postId }),
      });

      if (response.ok) {
        const data = await response.json();
        setLikes(data.count);
        setIsHeartClicked(data.likes.some((like) => like.uid === userId));
      } else {
        console.error("Failed to fetch likes");
      }
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };
  const postUrl = `${window.location.origin}/post/${postId}`;
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleDownload = () => {
    setIsDownloadClicked(true);
    const apiUrl = `/api/download?url=${encodeURIComponent(imageUrl)}`;
    // Tạo một thẻ <a> ẩn để tải ảnh
    const link = document.createElement("a");
    link.href = apiUrl;
    link.download = "downloaded_image.jpg"; // Tên file khi tải xuống
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setIsDownloadClicked(false), 200); // Reset trạng thái sau khi click
  };
  
  useEffect(() => {
    fetchLikes();
  }, [postId]);

  const handleHeartClick = async () => {
    try {
      if (isHeartClicked) {
        // Gọi API DELETE để unlike
        const response = await fetch("/api/like", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uid: userId, pid: postId }),
        });
  
        if (response.ok) {
          setIsHeartClicked(false);
          setLikes((prev) => prev - 1);
        } else {
          console.error("Error unliking post");
        }
      } else {
        // Gọi API POST để like
        const response = await fetch("/api/like", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uid: userId, pid: postId }),
        });
  
        if (response.ok) {
          setIsHeartClicked(true);
          setLikes((prev) => prev + 1);
        } else {
          console.error("Error liking post");
        }
      }
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  return (
    <div className="flex items-center justify-between w-full h-14 bg-white">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        {/* Like Button */}
        <button
          onClick={handleHeartClick}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition ${
            isHeartClicked ? "bg-red-100 text-red-500" : "hover:bg-gray-200"
          }`}
        >
          {isHeartClicked ? (
            <svg fill="#ff4d4d" width="30px" height="30px" viewBox="0 0 256 256">
              <path d="M220.3,136.5l-81,81a16,16,0,0,1-22.6,0L33.6,134.4a60,60,0,0,1,2.3-87,59.5,59.5,0,0,1,87.1,2.3l7.5,7.5,9.6-9.6a60.7,60.7,0,0,1,44-17.6,59.5,59.5,0,0,1,44.5,19.9C245.6,75.2,243.7,113.2,220.3,136.5Z"/>
            </svg>
          ) : (
            <svg fill="#000" width="30px" height="30px" viewBox="0 0 256 256">
              <path d="M128,226.2a20,20,0,0,1-14.1-5.8L30.7,137.3A64,64,0,0,1,33.2,44.4,62,62,0,0,1,79.2,28.8a68.7,68.7,0,0,1,44.1,20L128,53.5l6.7-6.7a64,64,0,0,1,92.9,2.5A62,62,0,0,1,243.2,95.2a68.7,68.7,0,0,1-20,44.1l-81,81A20,20,0,0,1,128,226.2Z"/>
            </svg>
          )}
        </button>
        <span className="text-lg font-semibold">{likes}</span>

        {/* Share Button */}
        <button
          onClick={() => setIsShareClicked(!isShareClicked)}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition ${
            isShareClicked ? "bg-black text-white" : "hover:bg-gray-200"
          }`}
        >
          <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none"
            stroke={isShareClicked ? "#ffffff" : "#000000"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v8.5M15 7l-3-3-3 3m-4 5v5a2 2 0 002 2h10a2 2 0 002-2v-5" />
          </svg>
        </button>

        {/* Share Pop-up */}
        {isShareClicked && (
          <div className="absolute top-50 left-220 bg-white shadow-lg rounded-lg p-4 w-56">
            <p className="text-lg font-semibold mb-2">Share</p>
            <button
              onClick={handleCopyLink}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100 flex items-center"
            >
              📋 Copy Link
            </button>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}&quote=Check%20out%20this%20post!`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100 flex items-center"
            >
              📘 Facebook
            </a>
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(postUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100 flex items-center"
            >
              ✈️ Telegram
            </a>
          </div>
        )}

        {/* Download Button */}
        <button
          onClick={handleDownload}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition ${
            isDownloadClicked ? "bg-black text-white" : "hover:bg-gray-200"
          }`}
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          height="24"
          width="24"
          viewBox="0 0 24 24"
        >
          <path d="M12 16L7 11h3V3h4v8h3z" />
          <path d="M5 18h14v2H5z" />
        </svg>
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Save Button */}
        <button
          onClick={() => setIsSaveClicked(!isSaveClicked)}
          className={`px-4 py-2 rounded-full transition ${
            isSaveClicked ? "bg-black text-white" : "bg-red-500 text-white"
          }`}
        >
          {isSaveClicked ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default PostActions;
