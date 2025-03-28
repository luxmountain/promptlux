"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PinListSearch from "../../components/Pins/PinListQuery"; // Import component mới

function SearchPage() {
  const { q } = useParams(); // Lấy giá trị q từ URL
  const decodedQuery = decodeURIComponent(q || ""); // ✅ Decode query để tránh lỗi ký tự `%20`
  const [results, setResults] = useState({ tags: [], posts: [] });

  useEffect(() => {
    if (q) {
      fetch(`/api/search?q=${q}`)
        .then((res) => res.json())
        .then((data) => setResults(data))
        .catch((err) => console.error("Search error:", err));
    }
  }, [q]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Search Results for "{decodedQuery}"
      </h1>

      {/* Hiển thị Tags */}
      {results.tags.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Tags</h2>
          <ul className="flex flex-wrap gap-2">
            {results.tags.map((tag, index) => (
              <li key={index} className="bg-gray-200 px-3 py-1 rounded-full">
                #{tag}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Hiển thị Related Pins */}
      {results.posts.length > 0 ? (
        <div>
          <h2 className="text-lg font-semibold">Related Pins</h2>
          <PinListSearch pid={results.posts} />
        </div>
      ) : (
        <p className="text-gray-500">No related pins found.</p>
      )}
    </div>
  );
}

export default SearchPage;
