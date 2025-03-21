"use client";
import React from "react";
import ListWrapper from "../wrapper/List";
import UserListItem from "./UserItem"; // Import component chung

export default function FollowListPopup({ isOpen, onClose, users, title }) {
  return (
    <ListWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <ul className="space-y-3">
        {users.length > 0 ? (
          users.map((user) => <UserListItem key={user.id} user={user} />)
        ) : (
          <p className="text-center text-gray-500">Không có dữ liệu</p>
        )}
      </ul>
    </ListWrapper>
  );
}
