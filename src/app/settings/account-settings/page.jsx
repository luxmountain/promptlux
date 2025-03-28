"use client";
import React from "react";
import SettingMenu from "../../components/wrapper/SettingMenu";

function AccountSettings() {
  return (
    <SettingMenu>
      <h2 className="text-xl font-semibold">Account Settings</h2>
      <p className="text-gray-600">Chọn một mục từ menu để chỉnh sửa.</p>
    </SettingMenu>
  );
}

export default AccountSettings;
