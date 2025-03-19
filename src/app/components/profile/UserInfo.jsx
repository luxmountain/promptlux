"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import ShareButton from "../action/ShareButton";
import FollowButton from "../action/FollowButton";
import FollowListPopup from "../popup/FollowList";

function UserInfo({ userInfo, onTabChange }) {
  const { data: session } = useSession();
  console.log(userInfo);
  console.log(session);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [popupData, setPopupData] = useState({ isOpen: false, users: [], title: "" });

  useEffect(() => {
    if (!userInfo?.uid) return;

    fetch("/api/follow/getFollower", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid: userInfo.uid }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFollowerCount(data.followers.length);
        setFollowers(data.followers);
      })
      .catch((error) => console.error("Error fetching followers:", error));

    fetch("/api/follow/getFollowing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid: userInfo.uid }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFollowingCount(data.following.length);
        setFollowing(data.following);
      })
      .catch((error) => console.error("Error fetching following:", error));
  }, [userInfo?.uid]);

  const onLogoutClick = () => {
    signOut({ callbackUrl: "/" });
  };

  const openPopup = (type) => {
    if (type === "followers") {
      setPopupData({ isOpen: true, users: followers, title: "Danh sách Followers" });
    } else {
      setPopupData({ isOpen: true, users: following, title: "Danh sách Following" });
    }
  };

  const closePopup = () => {
    setPopupData({ isOpen: false, users: [], title: "" });
  };
  return (
    <div className="flex flex-col items-center mt-8">
      <Image
        src={userInfo.avatar_image || "/default-avatar.png"}
        alt="User Image"
        width={100}
        height={100}
        className="w-36 h-36 rounded-full object-cover"
      />

      <h2 className="text-[30px] font-semibold">{userInfo.username}</h2>
      <h2 className="text-gray-400">{userInfo.email}</h2>

      {/* Hiển thị số lượng follower và following */}
      <div className="flex gap-4 mt-2">
        <h3 className="text-gray-700 cursor-pointer" onClick={() => openPopup("following")}>
          Following: {followingCount}
        </h3>
        <h3 className="text-gray-700 cursor-pointer" onClick={() => openPopup("followers")}>
          Followers: {followerCount}
        </h3>
      </div>

      <div className="flex gap-4 mb-2">
        <div className="p-2 px-3 font-semibold mt-5 rounded-full cursor-pointer">
          <ShareButton link={typeof window !== "undefined" ? window.location.href : ""} message={"Check this user profile!"} />
        </div>
        <button
          className="bg-gray-200 p-2 px-3 font-semibold mt-5 rounded-full cursor-pointer"
          onClick={() => onTabChange("saved")}
        >
          Saved
        </button>
        <button
          className="bg-gray-200 p-2 px-3 font-semibold mt-5 rounded-full cursor-pointer"
          onClick={() => onTabChange("created")}
        >
          Created
        </button>
        {session?.user?.uid === userInfo.uid ? (
          // Nếu là chính chủ thì hiện nút Logout, ẩn Follow
          <button
            className="bg-gray-200 p-2 px-3 font-semibold mt-5 rounded-full cursor-pointer"
            onClick={onLogoutClick}
          >
            Logout
          </button>
        ) : (
          // Nếu không phải chính chủ thì hiện Follow, ẩn Logout
          <FollowButton userInfo={userInfo} />
        )}
      </div>

      {/* Popup hiển thị danh sách followers/following */}
      <FollowListPopup isOpen={popupData.isOpen} onClose={closePopup} users={popupData.users} title={popupData.title} />
    </div>
  );
}

export default UserInfo;
