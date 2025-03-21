import React from "react";

const SearchWrapper = ({ children }) => {
  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-lg mt-1 z-20 max-h-[600px] min-h-[150px] overflow-y-auto p-4 rounded-xl">
      {children}
    </div>
  );
};

export default SearchWrapper;
