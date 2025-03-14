"use client";
import React, { useState } from "react";

const PostActions = () => {
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [isShareClicked, setIsShareClicked] = useState(false);
  const [isDotsClicked, setIsDotsClicked] = useState(false);
  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const [isSaveClicked, setIsSaveClicked] = useState(false);
  const [likes, setLikes] = useState(740);

  const handleHeartClick = () => {
    setIsHeartClicked(!isHeartClicked);
    setLikes((prev) => (isHeartClicked ? prev - 1 : prev + 1));
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
            <svg
              fill="#ff4d4d"
              width="30px"
              height="30px"
              viewBox="0 0 256 256"
            >
              <path d="M220.3457,136.50781l-81.03125,81.03125a16.013,16.013,0,0,1-22.625,0L33.58008,134.42969a59.974,59.974,0,0,1,2.34375-87.07031c23.28125-21.01563,61.25-19.05469,84.57812,4.29687l7.5,7.49219,9.57813-9.57813a60.69786,60.69786,0,0,1,43.98437-17.55469A59.54956,59.54956,0,0,1,224.627,51.90625C245.61133,75.20312,243.68945,113.15625,220.3457,136.50781Z" />
            </svg>
          ) : (
            <svg fill="#000" width="30px" height="30px" viewBox="0 0 256 256">
              <path d="M128,226.21533a19.93749,19.93749,0,0,1-14.1416-5.8468L30.74512,137.25476A64.00169,64.00169,0,0,1,33.22949,44.3877,62.00843,62.00843,0,0,1,79.2168,28.80127,68.71888,68.71888,0,0,1,123.335,48.82568L128,53.49048l6.74512-6.74536a64.00273,64.00273,0,0,1,92.86718,2.48474A62.00271,62.00271,0,0,1,243.19922,95.217a68.72656,68.72656,0,0,1-20.02442,44.11829l-81.03222,81.03222-.001.00122A19.94136,19.94136,0,0,1,128,226.21533Z" />
            </svg>
          )}
        </button>

        {/* Like Count */}
        <span className="text-lg font-semibold">{likes}</span>

        {/* Share Button */}
        <button
          onClick={() => setIsShareClicked(!isShareClicked)}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition ${
            isShareClicked ? "bg-black text-white" : "hover:bg-gray-200"
          }`}
        >
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isShareClicked ? "#ffffff" : "#000000"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v8.5M15 7l-3-3-3 3m-4 5v5a2 2 0 002 2h10a2 2 0 002-2v-5" />
          </svg>
        </button>

        {/* Dots Button */}
        <button
          onClick={() => setIsDotsClicked(!isDotsClicked)}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition ${
            isDotsClicked ? "bg-black text-white" : "hover:bg-gray-200"
          }`}
        >
          <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none">
            <path
              d="M7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12Z"
              fill={isDotsClicked ? "#fff" : "#000"}
            />
            <path
              d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
              fill={isDotsClicked ? "#fff" : "#000"}
            />
            <path
              d="M21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z"
              fill={isDotsClicked ? "#fff" : "#000"}
            />
          </svg>
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Profile Button */}
        <button
          onClick={() => setIsProfileClicked(!isProfileClicked)}
          className={`px-4 py-2 flex items-center gap-2 rounded-full transition ${
            isProfileClicked ? "bg-black text-white" : "hover:bg-gray-200"
          }`}
        >
          Profile
        </button>

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
