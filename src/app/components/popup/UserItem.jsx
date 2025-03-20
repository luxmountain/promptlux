"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import FollowButton from "../action/FollowButton";

export default function UserListItem({ user }) {
  const router = useRouter();
  const { data: session } = useSession();
  const currentUserId = session?.user?.uid; // Lấy UID của user hiện tại từ session
  console.log("user", user);
  console.log("currentUserId", currentUserId);
  return (
    <li className="flex items-center gap-3 border-b pb-2 p-2 rounded-lg hover:bg-gray-100">
      {/* Avatar - Chuyển hướng khi click */}
      <img
        src={user.avatar_image || "/default-avatar.png"}
        alt={user.username}
        className="w-10 h-10 rounded-full cursor-pointer"
        onClick={() => router.push(`/${user.username}`)}
      />

      {/* Thông tin User - Cũng chuyển hướng khi click */}
      <div className="flex-1 cursor-pointer" onClick={() => router.push(`/${user.username}`)}>
        <h3 className="font-semibold">{user.username}</h3>
        {user.email && <p className="text-sm text-gray-500">{user.email}</p>}
      </div>

      {/* Follow Button - Hoạt động độc lập */}
      {currentUserId && user.uid !== currentUserId && (
        <div onClick={(e) => e.stopPropagation()}> {/* Ngăn event bubble khi click vào FollowButton */}
          <FollowButton followingUserId={currentUserId} followedUserId={user.uid} />
        </div>
      )}
    </li>
  );
}
