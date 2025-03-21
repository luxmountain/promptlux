import React, { useEffect, useState } from "react";
import UserListItem from "./UserItem"; // Import UserListItem

const LikePostList = ({ pid }) => {
  const [likedUsers, setLikedUsers] = useState([]);

  useEffect(() => {
    if (!pid) return; // Tránh gọi API khi pid chưa có

    const fetchLikedUsers = async () => {
      try {
        const response = await fetch("/api/like/getLike", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pid }),
        });

        if (response.ok) {
          const data = await response.json();
          setLikedUsers(data.likes);
        } else {
          console.error("Failed to fetch liked users");
        }
      } catch (error) {
        console.error("Error fetching liked users:", error);
      }
    };

    fetchLikedUsers();
  }, [pid]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">People who liked this post</h2>
      {likedUsers.length > 0 ? (
        <ul className="space-y-2">
          {likedUsers.map((like) => (
            <UserListItem
              key={like.uid}
              user={{
                uid: like.uid,  // Truyền thêm uid
                username: like.user.username,
                avatar_image: like.user.avatar_image,
              }}
            />
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No likes yet</p>
      )}
    </div>
  );
};

export default LikePostList;
