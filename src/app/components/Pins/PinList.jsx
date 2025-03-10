"use client";

import React, { useEffect, useState } from "react";
import PinItem from "./PinItem";

function PinList() {
  const [pins, setPins] = useState([]);

  // Fetch dữ liệu từ API
  useEffect(() => {
    fetch("/api/pins")
      .then((response) => response.json())
      .then((data) => setPins(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 p-4">
      {pins.map((pin) => (
        <PinItem key={pin.id} pin={pin} />
      ))}
    </div>
  );
}

export default PinList;
