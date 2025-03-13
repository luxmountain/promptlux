"use client";

import React, { useEffect, useState } from "react";
import PinItem from "./PinItem";
import { useSession } from "next-auth/react";

function PinListUser() {
  const { data: session } = useSession();
  const [pins, setPins] = useState([]);

  useEffect(() => {
    const fetchUserPins = async () => {
      if (!session?.user?.email) return;

      try {
        const uidResponse = await fetch("/api/users/getId", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: session.user.email }),
        });

        const uidData = await uidResponse.json();
        if (!uidResponse.ok) throw new Error(uidData.message || "Failed to fetch UID");

        const { uid } = uidData;

        const pinsResponse = await fetch("/api/pins/getUserPins", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uid }),
        });

        const pinsData = await pinsResponse.json();
        if (!pinsResponse.ok) throw new Error(pinsData.message || "Failed to fetch pins");

        setPins(pinsData);
      } catch (error) {
        console.error("Error fetching user pins:", error);
      }
    };

    fetchUserPins();
  }, [session]);

  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 p-4">
      {pins.map((pin) => (
        <PinItem key={pin.id} pin={pin} />
      ))}
    </div>
  );
}

export default PinListUser;
