import React from "react";

function Menu({ active, setActive }) {
  return (
    <div className="flex flex-col max-h-full w-1/5 bg-white p-4 gap-4">
      {/* Nút Edit profile (MẶC ĐỊNH CÓ THANH ĐEN) */}
      <div>
        <button
          onClick={() => setActive("profile")}
          className="bg-white p-2 font-semibold rounded text-left hover:bg-[#e9e9e9] flex flex-col items-start pb-0"
        >
          <span>Edit profile</span>
          <span
            className={`h-[3px] w-full transition-all ${
              active === "profile" ? "bg-black" : "bg-transparent"
            }`}
          />
        </button>
      </div>

      {/* Nút Account management */}
      <div>
        <button
          onClick={() => setActive("account")}
          className="bg-white p-2 font-semibold rounded text-left hover:bg-[#e9e9e9] flex flex-col items-start pb-0"
        >
          <span>Account management</span>
          <span
            className={`h-[3px] w-full transition-all ${
              active === "account" ? "bg-black" : "bg-transparent"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

export default Menu;
