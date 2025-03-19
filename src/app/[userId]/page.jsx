"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Lấy userId từ URL
import UserInfo from "../components/profile/UserInfo";
import PinListUser from "../components/Pins/PinListUser";
import SavedPinList from "../components/Pins/SavedPinList";

function Profile() {
  const params = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [activeTab, setActiveTab] = useState("created");

  useEffect(() => {
    if (!params?.userId) return; // Thay vì userId, ta lấy userId từ URL

    const fetchUserInfo = async () => {
      try {
        const username = decodeURIComponent(params.userId); // Chuyển về chữ thường
        // Gọi API mới để lấy UID theo userId
        const res = await fetch("/api/users/getId", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username }), // Gửi userId đã được lowercase
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Không thể lấy UID");
        }

        const uid = data.uid;

        // Gọi API để lấy thông tin user theo UID
        const userRes = await fetch("/api/users/getUserInfo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uid }),
        });

        const userData = await userRes.json();
        if (!userRes.ok) {
          throw new Error(userData.error || "Không thể lấy thông tin user");
        }

        setUserInfo(userData);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin user:", error);
      }
    };

    fetchUserInfo();
  }, [params?.userId]); // Theo dõi userId thay vì userId

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };

  return (
    <div>
      {userInfo ? <UserInfo userInfo={userInfo} onTabChange={handleTabChange} /> : null}
      {activeTab === "created" && <PinListUser uid={userInfo?.uid} />}
      {activeTab === "saved" && <SavedPinList uid={userInfo?.uid} />}
    </div>
  );
}

export default Profile;
