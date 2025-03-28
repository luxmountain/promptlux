"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"; // ✅ Import useSession
import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SearchWrapper from "../wrapper/Search";
import SuggestionList from "../suggestion/List";
import SearchQuery from "./Query";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const userId = session?.user?.uid;

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // ✅ Save search query in the user's recent searches
  const saveSearchQuery = async (query) => {
    if (!userId) return;

    try {
      await fetch("/api/search/recent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid: userId, keyword: query }),
      });
    } catch (error) {
      console.error("Failed to save search query:", error);
    }
  };

  // ✅ Save search query in the popular searches database
  const savePopularSearch = async (query) => {
    try {
      await fetch("/api/search/popular", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword: query }),
      });
    } catch (error) {
      console.error("Failed to save popular search:", error);
    }
  };

  // ✅ Handle search when user presses Enter
  const handleSearch = async () => {
    if (searchQuery.trim() !== "") {
      await saveSearchQuery(searchQuery);  // Save in recent searches
      await savePopularSearch(searchQuery); // Save in popular searches
      router.push(`/search/${encodeURIComponent(searchQuery)}`);
      setShowPopup(false);
    }
  };

  // ✅ Handle selecting a suggestion
  const handleSelectSearchQuery = async (query) => {
    setSearchQuery(query);
    await saveSearchQuery(query);
    await savePopularSearch(query);
    setShowPopup(false);
    router.push(`/search/${encodeURIComponent(query)}`);
  };

  return (
    <div className="relative w-full">
      {/* Search Bar */}
      <div className="relative flex bg-gray-200 rounded-full p-2 items-center w-full pr-4">
        <SearchIcon className="text-gray-500 cursor-pointer" onClick={handleSearch} />
        <InputBase
          placeholder="Search"
          className="ml-2 w-full"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setShowPopup(true)}
          onBlur={() => setTimeout(() => setShowPopup(false), 200)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>

      {/* Search Suggestions & Popular Searches */}
      {showPopup && (
        <SearchWrapper>
          {searchQuery ? (
            <SearchQuery query={searchQuery} onSelectQuery={handleSelectSearchQuery} />
          ) : (
            <SuggestionList onSelectRecent={handleSelectSearchQuery} />
          )}
        </SearchWrapper>
      )}
    </div>
  );
}

export default SearchBar;
