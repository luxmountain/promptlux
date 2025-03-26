"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";  
import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SearchWrapper from "../wrapper/Search";
import SuggestionList from "../suggestion/List";
import SearchQuery from "./Query";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      router.push(`/search/${encodeURIComponent(searchQuery)}`);
    }
  };

  // Khi chọn một Recent Search, cập nhật input và tìm kiếm luôn
  const handleSelectRecentSearch = (query) => {
    setSearchQuery(query);
    setShowPopup(false);  // Ẩn popup sau khi chọn
    router.push(`/search/${encodeURIComponent(query)}`); // Thực hiện tìm kiếm
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
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}  
        />
      </div>

      {showPopup && (
        <SearchWrapper>
          {searchQuery ? (
            <SearchQuery query={searchQuery} />
          ) : (
            <SuggestionList onSelectRecent={handleSelectRecentSearch} />
          )}
        </SearchWrapper>
      )}
    </div>
  );
}

export default SearchBar;
