"use client";

import React, { useEffect, useState } from "react";

const suggestionsPopularData = [
  { id: 1, title: "PC desktop wallpaper", image: "https://placekitten.com/301/200" },
  { id: 2, title: "Web layout design", image: "https://placekitten.com/302/200" },
  { id: 3, title: "Gaming computer room", image: "https://placekitten.com/303/200" },
  { id: 4, title: "Study planner printable", image: "https://placekitten.com/304/200" },
  { id: 5, title: "Minimalist desktop setup", image: "https://placekitten.com/305/200" },
];

const SearchWrapper = () => {
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentSearches = async () => {
      try {
        const userId = 1; // Thay đổi user ID theo logic của bạn
        const res = await fetch(`/api/search/recent/${userId}`);
        const data = await res.json();
        if (res.ok) {
          setRecentSearches(data.map((item) => ({ id: item.id, title: item.keyword })));
        } else {
          console.error("Failed to fetch recent searches:", data.message);
        }
      } catch (error) {
        console.error("Error fetching recent searches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentSearches();
  }, []);

  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-lg mt-1 z-20 max-h-[600px] overflow-y-auto p-4 rounded-xl">
      {/* Recent Search */}
      <h2 className="text-lg font-bold text-black mb-3">Recent search</h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {recentSearches.map((suggestion) => (
            <div
              key={suggestion.id}
              className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-full transition hover:bg-gray-200 max-w-[300px]"
            >
              <span className="text-sm text-gray-800 mr-2">{suggestion.title}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z" fill="#000000"/></svg>
            </div>
          ))}
        </div>
      )}

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
};

export default SearchWrapper;