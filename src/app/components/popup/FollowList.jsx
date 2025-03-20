"use client";
import React from "react";
import { useRouter } from "next/navigation";

function FollowListPopup({ isOpen, onClose, users, title }) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>
          ✖
        </button>
        <ul className="space-y-3">
          {users.length > 0 ? (
            users.map((user) => (
              <li
                key={user.id}
                className="flex items-center gap-3 border-b pb-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
                onClick={() => router.push(`/${user.username}`)} // Navigate to user profile
              >
                <img
                  src={user.avatar_image || "/default-avatar.png"}
                  alt={user.username}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{user.username}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">Không có dữ liệu</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default FollowListPopup;
