"use client";
import React, { useEffect, useState } from "react";
import ShareButton from "../action/ShareButton";
import SaveButton from "../action/SaveButton";
import LikePostList from "../popup/LikePostList"; // Import danh sách người thích
import ListWrapper from "../wrapper/List"; // Wrapper for popups
import CreatedUserActions from "./createdActions";

const PostActions = ({ postOwnerId, postId, userId, imageUrl }) => {
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isDownloadClicked, setIsDownloadClicked] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State mở popup

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

  const handleHeartClick = async () => {
    try {
      if (isHeartClicked) {
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
  const [seenCount, setSeenCount] = useState(0);

  const fetchSeenCount = async () => {
    try {
      await fetch("/api/seen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: userId, pid: postId }),
      });
  
      const response = await fetch(`/api/seen/${postId}`);
      if (!response.ok) throw new Error("Failed to fetch seen count");
  
      const data = await response.json();
      setSeenCount(data.length);
    } catch (error) {
      console.error("Error updating seen count:", error);
    }
  };
  
  useEffect(() => {
    fetchLikes();
    const timer = setTimeout(fetchSeenCount, 10000); // Gọi fetchSeenCount sau 10 giây
  
    return () => clearTimeout(timer);
  }, [postId, userId]);
  
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

        {/* Hiển thị số lượt thích, nhấn vào mở popup */}
        <span
          className="text-lg font-semibold cursor-pointer hover:underline"
          onClick={() => setIsPopupOpen(true)}
        >
          {likes}
        </span>

        {/* Share Button */}
        <ShareButton link={`${window.location.origin}/pin/${postId}`} message={"🔥 Check out this amazing post! 🚀"}/>

        {/* Download Button */}
        <button
          onClick={() => {
            setIsDownloadClicked(true);
            const apiUrl = `/api/download?url=${encodeURIComponent(imageUrl)}`;
            const link = document.createElement("a");
            link.href = apiUrl;
            link.download = "downloaded_image.jpg";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setTimeout(() => setIsDownloadClicked(false), 200);
          }}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition ${
            isDownloadClicked ? "bg-black text-white" : "hover:bg-gray-200"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" width="24" viewBox="0 0 24 24">
            <path d="M12 16L7 11h3V3h4v8h3z" />
            <path d="M5 18h14v2H5z" />
          </svg>
        </button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="w-5 h-5 mt-1 text-c-12"
        >
          <path d="M12 15a3 3 0 100-6 3 3 0 000 6z"></path>
          <path
            fillRule="evenodd"
            d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
            clipRule="evenodd"
          ></path>
        </svg>

        <span className="text-lg font-semibold">{seenCount}</span>
      </div>

      {/* Right Section */}
      <CreatedUserActions postOwnerId={postOwnerId} pid={postId} uid={userId} />
      <SaveButton pid={postId} uid={userId} postOwnerId={postOwnerId} />

      {/* Popup danh sách người thích bài viết */}
      <ListWrapper isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        {isPopupOpen && postId && <LikePostList pid={postId} />}
      </ListWrapper>
    </div>
  );
};

export default PostActions;