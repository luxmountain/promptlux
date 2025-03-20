import React, { useEffect, useState } from "react";

function FollowButton({ followingUserId, followedUserId }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Kiểm tra trạng thái follow khi component mount
  useEffect(() => {
    const checkFollowingStatus = async () => {
      try {
        const response = await fetch(`/api/follow/check`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ followingUserId, followedUserId }),
        });

        if (!response.ok) {
          throw new Error("Failed to check follow status");
        }

        const data = await response.json();
        setIsFollowing(data.isFollowing); // Cập nhật trạng thái
      } catch (error) {
        console.error("Error checking follow status:", error);
      }
    };

    if (followingUserId && followedUserId) {
      checkFollowingStatus();
    }
  }, [followingUserId, followedUserId]);

  // Xử lý follow/unfollow
  const handleFollowToggle = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch(`/api/follow/${isFollowing ? "unfollow" : "follow"}`, {
        method: isFollowing ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followingUserId, followedUserId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isFollowing ? "unfollow" : "follow"}`);
      }

      setIsFollowing(!isFollowing); // Cập nhật trạng thái sau khi thành công
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleFollowToggle}
      disabled={loading}
      className={`p-2 px-3 font-semibold mt-5 rounded-full cursor-pointer transition-colors duration-300 ${
        isFollowing ? "bg-black text-white" : "bg-red-500 text-white"
      } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {loading ? "Processing..." : isFollowing ? "Followed" : "Follow"}
    </button>
  );
}

export default FollowButton;
