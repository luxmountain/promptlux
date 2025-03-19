"use client";
import React, { useEffect, useState } from "react";

function SaveButton({ pid, uid }) {
  const [isSaveClicked, setIsSaveClicked] = useState(false);

  useEffect(() => {
    const checkIfSaved = async () => {
      try {
        const response = await fetch(`/api/pins/getSavedPins/check`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uid, pid }),
        });

        if (response.ok) {
          const data = await response.json();
          setIsSaveClicked(data.isSaved);
        }
      } catch (error) {
        console.error("Error checking saved post:", error);
      }
    };

    checkIfSaved();
  }, [pid, uid]);

  const handleSaveClick = async () => {
    try {
      if (isSaveClicked) {
        // Unsave post
        const response = await fetch("/api/pins/getSavedPins/unsave", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uid, pid }),
        });

        if (response.ok) {
          setIsSaveClicked(false);
        } else {
          console.error("Error unsaving post");
        }
      } else {
        // Save post
        const response = await fetch("/api/pins/getSavedPins/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uid, pid }),
        });

        if (response.ok) {
          setIsSaveClicked(true);
        } else {
          console.error("Error saving post");
        }
      }
    } catch (error) {
      console.error("Error handling save:", error);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Save Button */}
      <button
        onClick={handleSaveClick}
        className={`px-4 py-2 rounded-full transition ${
          isSaveClicked ? "bg-black text-white" : "bg-red-500 text-white"
        }`}
      >
        {isSaveClicked ? "Saved" : "Save"}
      </button>
    </div>
  );
}

export default SaveButton;
