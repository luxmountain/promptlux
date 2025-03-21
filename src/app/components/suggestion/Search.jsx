"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // Import session

const suggestionsPopularData = [
  { id: 1, title: "PC desktop wallpaper", image: "https://placekitten.com/301/200" },
  { id: 2, title: "Web layout design", image: "https://placekitten.com/302/200" },
  { id: 3, title: "Gaming computer room", image: "https://placekitten.com/303/200" },
  { id: 4, title: "Study planner printable", image: "https://placekitten.com/304/200" },
  { id: 5, title: "Minimalist desktop setup", image: "https://placekitten.com/305/200" },
];

const SearchWrapper = () => {
  const { data: session } = useSession(); // Lấy session
  const userId = session?.user?.uid; // Lấy userId từ session
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchRecentSearches();
    }
  }, [userId]);

  const fetchRecentSearches = async () => {
    setLoading(true);
    try {
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

  const handleDeleteRecent = async (searchId) => {
    try {
      const res = await fetch(`/api/search/recent/${userId}?searchId=${searchId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setRecentSearches((prev) => prev.filter((search) => search.id !== searchId));
      } else {
        const data = await res.json();
        console.error("Failed to delete search:", data.message);
      }
    } catch (error) {
      console.error("Error deleting search:", error);
    }
  };

  const handleClearAll = async () => {
    try {
      const res = await fetch(`/api/search/recent/${userId}`, { method: "DELETE" });
      if (res.ok) {
        setRecentSearches([]);
      } else {
        const data = await res.json();
        console.error("Failed to delete all searches:", data.message);
      }
    } catch (error) {
      console.error("Error deleting all searches:", error);
    }
  };

  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-lg mt-1 z-20 max-h-[600px] overflow-y-auto p-4 rounded-xl">
      {/* Recent Search */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-black">Recent search</h2>
        {recentSearches.length > 0 && (
          <button onClick={handleClearAll} className="text-red-500 text-sm hover:underline cursor-pointer">
            Clear All
          </button>
        )}
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : recentSearches.length === 0 ? (
        <p className="text-gray-500">No recent searches.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {recentSearches.map((suggestion) => (
            <div
              key={suggestion.id}
              className="flex items-center cursor-pointer justify-between bg-gray-100 px-3 py-2 rounded-full transition hover:bg-gray-200 max-w-[300px]"
            >
              <span className="text-sm text-gray-800 mr-2">{suggestion.title}</span>
              <button className="cursor-pointer" onClick={() => handleDeleteRecent(suggestion.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16px"
                  height="16px"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z"
                    fill="#000000"
                  />
                </svg>
              </button>
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
