import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const SuggestionList = ({ onSelectRecent }) => {
  const { data: session } = useSession();
  const userId = session?.user?.uid;
  const [recentSearches, setRecentSearches] = useState([]);
  const [popularSearches, setPopularSearches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchRecentSearches();
    }
    fetchPopularSearches();
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

  const fetchPopularSearches = async () => {
    try {
      const res = await fetch(`/api/search/recent/getPopular`);
      const data = await res.json();
      if (res.ok) {
        setPopularSearches(data.data);
      } else {
        console.error("Failed to fetch popular searches:", data.message);
      }
    } catch (error) {
      console.error("Error fetching popular searches:", error);
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
    <div>
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
              onClick={() => onSelectRecent(suggestion.title)}
            >
              <span className="text-sm text-gray-800 mr-2">{suggestion.title}</span>
              <button className="cursor-pointer" onClick={(e) => {
                e.stopPropagation();
                handleDeleteRecent(suggestion.id);
              }}>
                ❌
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Popular Search */}
      <h2 className="text-lg font-bold text-black mt-4 mb-3">Popular search</h2>
      <div className="flex flex-wrap gap-2">
        {popularSearches.map((suggestion, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-100 p-2 rounded-lg w-[300px] h-[100px] transition hover:bg-gray-200 cursor-pointer"
            onClick={() => onSelectRecent(suggestion.keyword)}  // ✅ Gọi onSelectRecent khi click vào
          >
            <img
              src={suggestion.image_url || "https://via.placeholder.com/80"}
              alt={suggestion.keyword}
              className="w-20 h-20 rounded-lg object-cover mr-3"
            />
            <span className="text-sm font-semibold text-gray-800">{suggestion.keyword}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestionList;
