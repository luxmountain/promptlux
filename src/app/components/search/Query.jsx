import React, { useEffect, useState } from "react";

function SearchQuery({ query, onSelectQuery }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      fetch(`/api/search/popular/getPopular?input=${query}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setResults(data.data); // Array of keywords
          } else {
            setResults([]);
          }
        })
        .catch((err) => console.error("Search error:", err));
    }
  }, [query]);

  return (
    <div className="w-full bg-white rounded-md mt-1">
      {results.length === 0 ? (
        <p className="text-gray-500 p-2">No results found</p>
      ) : (
        <ul>
          {results.map((item, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => onSelectQuery(item.keyword)}
            >
              {item.keyword}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchQuery;
