"use client";
import React, { useEffect, useState } from "react";

const PostActions = ({ postId }) => {
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isShareClicked, setIsShareClicked] = useState(false);
  const [isDotsClicked, setIsDotsClicked] = useState(false);
  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const [isSaveClicked, setIsSaveClicked] = useState(false);

  // Fetch like count from API
  const fetchLikes = async () => {
    try {
      const response = await fetch("/api/like/getLikes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pid: postId }),
      });

      if (response.ok) {
        const data = await response.json();
        setLikes(data.count);
      } else {
        console.error("Failed to fetch likes");
      }
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, [postId]);

  // Handle Like Click
  const handleHeartClick = async () => {
    console.log(`Heart clicked! Current state: ${isHeartClicked ? "Liked" : "Unliked"}`);

    setIsHeartClicked(!isHeartClicked);
    setLikes((prev) => (isHeartClicked ? prev - 1 : prev + 1));

    try {
      await fetch("/api/like/toggleLike", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pid: postId, action: isHeartClicked ? "unlike" : "like" }),
      });

      console.log(`Like API called: ${isHeartClicked ? "Unlike" : "Like"}`);
    } catch (error) {
      console.error("Error toggling like:", error);
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
          onClick={() => {
            setIsShareClicked(!isShareClicked);
            console.log(`Share clicked! New state: ${!isShareClicked}`);
          }}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition ${
            isShareClicked ? "bg-black text-white" : "hover:bg-gray-200"
          }`}
        >
          <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none"
            stroke={isShareClicked ? "#ffffff" : "#000000"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v8.5M15 7l-3-3-3 3m-4 5v5a2 2 0 002 2h10a2 2 0 002-2v-5" />
          </svg>
        </button>

        {/* Dots Button */}
        <button
          onClick={() => {
            setIsDotsClicked(!isDotsClicked);
            console.log(`Dots clicked! New state: ${!isDotsClicked}`);
          }}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition ${
            isDotsClicked ? "bg-black text-white" : "hover:bg-gray-200"
          }`}
        >
          <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none">
            <circle cx="5" cy="12" r="2" fill={isDotsClicked ? "#fff" : "#000"} />
            <circle cx="12" cy="12" r="2" fill={isDotsClicked ? "#fff" : "#000"} />
            <circle cx="19" cy="12" r="2" fill={isDotsClicked ? "#fff" : "#000"} />
          </svg>
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Save Button */}
        <button
          onClick={() => {
            setIsSaveClicked(!isSaveClicked);
            console.log(`Save clicked! New state: ${!isSaveClicked}`);
          }}
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
