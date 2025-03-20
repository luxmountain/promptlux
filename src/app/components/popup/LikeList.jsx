"use client";
import { useState, useEffect } from "react";
import UserListItem from "./UserItem"; // Import component chung

export default function LikedUsersList({ cid }) {
  const [likedUsers, setLikedUsers] = useState([]);

  useEffect(() => {
    const fetchLikedUsers = async () => {
      try {
        const response = await fetch(`/api/like/comment/${cid}`);
        if (!response.ok) throw new Error("Không thể lấy danh sách người thích");

        const data = await response.json();
        setLikedUsers(data.users || []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách người thích:", error);
      }
    };

    if (cid) {
      fetchLikedUsers();
    }
  }, [cid]);

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Danh sách người thích</h2>
      <ul className="space-y-3">
        {likedUsers.length > 0 ? (
          likedUsers.map((user) => <UserListItem key={user.id} user={user} />)
        ) : (
          <p className="text-center text-gray-500">Chưa có ai thích bình luận này</p>
        )}
      </ul>
    </div>
  );
}
