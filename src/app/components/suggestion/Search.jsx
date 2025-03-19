"use client";

import React from "react";

const suggestionsRecentData = [
  { id: 1, title: "PC desktop wallpaper" },
  { id: 2, title: "Web layout design" },
  { id: 3, title: "Gaming computer room" },
  { id: 4, title: "Study planner printable" },
  { id: 5, title: "Minimalist desktop setup" },
];

const suggestionsPopularData = [
  { id: 1, title: "PC desktop wallpaper", image: "" },
  { id: 2, title: "Web layout design", image: "https://placekitten.com/301/200" },
  { id: 3, title: "Gaming computer room", image: "https://placekitten.com/302/200" },
  { id: 4, title: "Study planner printable", image: "https://placekitten.com/303/200" },
  { id: 5, title: "Minimalist desktop setup", image: "https://placekitten.com/304/200" },
];

const SearchWrapper = () => (
  <div className="absolute top-full left-0 w-full bg-white shadow-lg mt-1 z-20 max-h-[600px] overflow-y-auto p-4 rounded-xl">
    {/* Recent Search */}
    <h2 className="text-lg font-bold text-black mb-3">Recent search</h2>
    <div className="flex flex-wrap gap-2">
      {suggestionsRecentData.map((suggestion) => (
        <div
          key={suggestion.id}
          className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-full transition hover:bg-gray-200 max-w-[300px]"
        >
          <span className="text-sm text-gray-800">{suggestion.title}</span>
          <button className="text-gray-500 hover:text-gray-700">
            {/* <XMarkIcon className="w-4 h-4" /> */}
          </button>
        </div>
      ))}
    </div>

    {/* Popular Search */}
    <h2 className="text-lg font-bold text-black mt-4 mb-3">Popular search</h2>
    <div className="flex flex-wrap gap-2">
      {suggestionsPopularData.map((suggestion) => (
        <div
          key={suggestion.id}
          className="flex items-center bg-gray-100 p-2 rounded-lg w-[300px] h-[100px] transition hover:bg-gray-200"
        >
          <img
            src={suggestion.image}
            alt={suggestion.title}
            className="w-20 h-20 rounded-lg object-cover mr-3"
          />
          <span className="text-sm font-semibold text-gray-800">{suggestion.title}</span>
        </div>
      ))}
    </div>
  </div>
);

export default SearchWrapper;