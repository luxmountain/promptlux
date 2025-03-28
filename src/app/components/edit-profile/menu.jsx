"use client";
import React from "react";
import { useRouter } from "next/navigation";

const menuItems = [
  { id: "profile", label: "Edit profile", url: "/settings/" },
  { id: "account", label: "Account management", url: "/settings/account-settings" },
  // { id: "privacy", label: "Privacy settings", url: "/settings/privacy" },
  // { id: "notifications", label: "Notification settings", url: "/settings/notifications" },
];

function Menu({ active, setActive }) {
  const router = useRouter();

  const handleNavigation = (id, url) => {
    setActive(id);
    router.push(url); // Chuyển sang trang tương ứng
  };

  return (
    <div className="flex flex-col max-h-full w-1/5 bg-white p-4 gap-4">
      {menuItems.map((item) => (
        <div key={item.id}>
          <button
            onClick={() => handleNavigation(item.id, item.url)}
            className="bg-white p-2 font-semibold rounded text-left hover:bg-[#e9e9e9] flex flex-col items-start pb-0"
          >
            <span>{item.label}</span>
            <span
              className={`h-[3px] w-full transition-all ${
                active === item.id ? "bg-black" : "bg-transparent"
              }`}
            />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Menu;
