"use client";
import React, { useState, useEffect } from "react";

function Tag({ selectedTags, setSelectedTags }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      setTotalResults(0);
      return;
    }

    const fetchTags = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/tags/search?q=${searchQuery}`);
        const data = await response.json();
        setSearchResults(data.matched_tags || []);
        setTotalResults(data.total || 0);
      } catch (error) {
        console.error("Error fetching tags:", error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchTags();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const selectTag = (tag) => {
    if (!selectedTags.find((t) => t.tid === tag.tid)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setSearchQuery("");
    setSearchResults([]);
  };

  const removeTag = (tid) => {
    setSelectedTags(selectedTags.filter((tag) => tag.tid !== tid));
  };

  return (
    <div className="relative w-full mt-1">
      {/* Input tìm kiếm */}
      <input
        type="text"
        placeholder="Search for a tag..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-300"
      />

      {/* Danh sách gợi ý */}
      {searchResults.length > 0 && (
        <div className="absolute top-full mt-1 w-full bg-white rounded-lg shadow-lg max-h-[220px] overflow-y-auto border border-gray-300">
          <div className="p-2 text-gray-500 text-xs">
            Matched tags ({totalResults}): 
          </div>
          {searchResults.map((tag) => (
            <div
              key={tag.tid}
              onClick={() => selectTag(tag)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {tag.tag_content}
            </div>
          ))}
        </div>
      )}

      {loading && <p className="text-sm text-gray-500 mt-1">Loading...</p>}

      {/* Danh sách tag đã chọn */}
      <div className="flex flex-wrap gap-4 mt-4">
        {selectedTags.map((tag) => (
          <div key={tag.tid} className="flex items-center bg-black text-white px-4 py-3 rounded-4xl text-base">
            {tag.tag_content}
            <button
              onClick={() => removeTag(tag.tid)}
              className="ml-2 text-red-400 hover:text-red-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 512 512"
                className="w-3 h-3"
              >
                <polygon points="512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512 512,452.922 315.076,256"/>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tag;