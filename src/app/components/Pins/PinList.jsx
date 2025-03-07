// 📌 PinList.jsx
import React from "react";
import PinItem from "./PinItem";

const mockPins = [
  {
    id: 1,
    title: "Beautiful Beach",
    desc: "Relaxing view of a tropical beach with clear blue water.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    id: 2,
    title: "Snowy Mountain",
    desc: "Breathtaking snow-covered mountains under a clear sky.",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
  },
  {
    id: 3,
    title: "City Night Lights",
    desc: "Stunning city skyline with glowing night lights.",
    image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc",
  },
  {
    id: 4,
    title: "Forest Waterfall",
    desc: "A beautiful waterfall hidden deep in the forest.",
    image: "https://images.unsplash.com/photo-1521747116042-5a810fda9664",
  },
  {
    id: 5,
    title: "Desert Dunes",
    desc: "Golden sand dunes stretching to the horizon.",
    image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
  },
];

function PinList() {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 p-4 mt-8">
      {mockPins.map((pin) => (
        <PinItem key={pin.id} pin={pin} />
      ))}
    </div>
  );
}

export default PinList;
