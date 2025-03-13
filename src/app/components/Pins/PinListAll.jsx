"use client";

import React, { useEffect, useState } from "react";
import PinItem from "./PinItem";

function PinListAll() {
  const [pins, setPins] = useState([]);

  // Fetch dữ liệu từ API
  useEffect(() => {
    fetch("/api/pins")
      .then((response) => response.json())
      .then((data) => setPins(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="columns-2 md:columns-4 lg:columns-6 gap-4 p-4">
      {pins.map((pin) => (
        <PinItem key={pin.id} pin={pin} />
      ))}
    </div>
  );
}

export default PinListAll;
