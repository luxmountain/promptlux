"use client";

import React, { useEffect, useState } from "react";
import PinItem from "./PinItem";
import { useSession } from "next-auth/react";

function SavedPinList() {
  const { data: session } = useSession();
  const [savedPins, setSavedPins] = useState([]);

  useEffect(() => {
    const fetchSavedPins = async () => {
      const uid = session?.user?.uid;
      if (!uid) return;

      try {
        const response = await fetch(`/api/pins/getSavedPins?uid=${uid}`);
        const data = await response.json();

        if (!response.ok) throw new Error(data.message || "Failed to fetch saved posts");

        setSavedPins(data);
      } catch (error) {
        console.error("Error fetching saved posts:", error);
      }
    };

    fetchSavedPins();
  }, [session]);

  return (
    <div className="columns-2 md:columns-4 lg:columns-6 gap-4 p-4">
      {savedPins.length > 0 ? (
        savedPins.map((savedPin) => (
          <PinItem key={savedPin.pid} pin={savedPin.post} />
        ))
      ) : (
        <p className="text-center text-gray-500">No saved posts yet.</p>
      )}
    </div>
  );
}

export default SavedPinList;
