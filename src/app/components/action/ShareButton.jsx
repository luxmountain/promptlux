import React, { useState } from "react";

const ShareButton = ({ link, message }) => {
  const [isShareClicked, setIsShareClicked] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

//   const handleMessengerShare = () => {
//     const messengerShareUrl = `https://www.messenger.com/share?link=${encodeURIComponent(link)}`;
//     window.open(messengerShareUrl, "_blank", "width=600,height=400");
//   };

  const handleTelegramShare = () => {
    const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(message)}`;
    window.open(telegramShareUrl, "_blank");
  };

  return (
    <div className="relative">
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

      {/* Share Pop-up */}
      {isShareClicked && (
        <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg p-4 w-56 z-10">
          <p className="text-lg font-semibold mb-2">Share</p>
          <button
            onClick={handleCopyLink}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100 flex items-center"
          >
            📋 Copy Link
          </button>
          {/* <button
            onClick={handleMessengerShare}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100 flex items-center"
          >
            💬 Messenger
          </button> */}
          <button
            onClick={handleTelegramShare}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100 flex items-center"
          >
            ✈️ Telegram
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
