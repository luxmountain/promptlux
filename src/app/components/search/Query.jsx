import React, { useEffect, useState } from "react";

function SearchQuery({ query, onSelectQuery }) {
  const [results, setResults] = useState({ tags: [], posts: [] });

  useEffect(() => {
    if (query) {
      fetch(`/api/search?q=${query}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
        })
        .catch((err) => console.error("Search error:", err));
    }
  }, [query]);

  return (
    <div className="w-full bg-white rounded-md mt-1 shadow-md">
      {results.tags.length === 0 && results.posts.length === 0 ? (
        <p className="text-gray-500 p-2">No results found</p>
      ) : (
        <>
          {/* Hiển thị Tags */}
          {results.tags.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-700 px-2">Tags</h3>
              <ul>
                {results.tags.map((tag, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => onSelectQuery(tag)}
                  >
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Hiển thị Posts */}
          {results.posts.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-700 mt-2 px-2">Posts</h3>
              <ul>
                {results.posts.map((post, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => onSelectQuery(post.title)}
                  >
                    <strong>{post.title}</strong>: {post.description}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SearchQuery;
