"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ListWrapper from "../wrapper/List"; // Import the wrapper

export default function FollowListPopup({ isOpen, onClose, users, title }) {
  const router = useRouter();

  return (
    <ListWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <ul className="space-y-3">
        {users.length > 0 ? (
          users.map((user) => (
            <li
              key={user.id}
              className="flex items-center gap-3 border-b pb-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
              onClick={() => router.push(`/${user.username}`)}
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
    </ListWrapper>
  );
}
