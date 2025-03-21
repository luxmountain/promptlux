"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";  // Import useRouter
import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SearchWrapper from "../wrapper/Search";
import SuggestionList from "../suggestion/List";
import SearchQuery from "./Query";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();  // Khởi tạo useRouter để điều hướng

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      router.push(`/search/${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative flex bg-gray-200 rounded-full p-2 items-center w-full pr-4">
        <SearchIcon className="text-gray-500 cursor-pointer" onClick={handleSearch} />
        <InputBase
          placeholder="Search"
          className="ml-2 w-full"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setShowPopup(true)}
          onBlur={() => setTimeout(() => setShowPopup(false), 200)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}  // Nhấn Enter để tìm kiếm
        />
      </div>

      {/* Hiển thị SearchWrapper */}
      {showPopup && (
        <SearchWrapper>
          {searchQuery ? <SearchQuery query={searchQuery} /> : <SuggestionList />}
        </SearchWrapper>
      )}
    </div>
  );
}

export default SearchBar;
