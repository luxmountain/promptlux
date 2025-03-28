"use client";
import React, { useEffect, useState } from "react";
import Menu from "../edit-profile/menu";

function SettingMenu({ children }) {
  const [active, setActive] = useState(null); // Initialize as null

  // Set the active menu item based on sessionStorage when the component mounts
  useEffect(() => {
    const savedTab = sessionStorage.getItem("activeMenu");
    if (savedTab) {
      setActive(savedTab); // Use the saved tab from sessionStorage
    } else {
      setActive("profile"); // Default to "profile" if no saved tab
    }
  }, []);

  // Prevent rendering until `active` is set
  if (active === null) {
    return null; // Or a loading spinner if needed
  }

  return (
    <div className="flex h-screen">
      <Menu active={active} setActive={setActive} /> {/* Pass the active state */}
      <div className="flex-grow p-8">{children}</div>
    </div>
  );
}

export default SettingMenu;
