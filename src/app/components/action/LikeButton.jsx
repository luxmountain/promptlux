import { useState, useEffect } from "react";

export default function LikeButton({ cid, userId }) {
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchLikeData = async () => {
      try {
        // Fetch total like count
        const likeResponse = await fetch(`/api/like/comment/${cid}`);
        if (!likeResponse.ok) throw new Error("Không thể lấy dữ liệu like");

        const likeData = await likeResponse.json();
        setLikeCount(likeData.likeCount || 0);

        // Fetch if the current user has liked this comment
        if (userId) {
          const checkResponse = await fetch(`/api/like/comment/${cid}/check?uid=${userId}`);
          if (!checkResponse.ok) throw new Error("Không thể kiểm tra trạng thái like");

          const checkData = await checkResponse.json();
          setIsHeartClicked(checkData.liked);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu like:", error);
      }
    };

    if (cid) {
      fetchLikeData();
    }
  }, [cid, userId]);

  const handleHeartClick = async () => {
    if (!userId) {
      alert("Bạn cần đăng nhập để thích bình luận!");
      return;
    }

    try {
      if (isHeartClicked) {
        // Send Unlike request
        const response = await fetch(`/api/like/comment`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uid: userId, cid }),
        });

        if (!response.ok) throw new Error("Unlike thất bại");

        setIsHeartClicked(false);
        setLikeCount((prev) => Math.max(prev - 1, 0));
      } else {
        // Send Like request
        const response = await fetch(`/api/like/comment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uid: userId, cid }),
        });

        if (!response.ok) throw new Error("Like thất bại");

        setIsHeartClicked(true);
        setLikeCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Lỗi khi xử lý like/unlike:", error);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleHeartClick}
        className={`w-4 h-4 flex items-center justify-center rounded-full transition ${
          isHeartClicked ? "bg-red-100 text-red-500" : "hover:bg-gray-200"
        }`}
      >
        {isHeartClicked ? (
          <svg fill="#ff4d4d" width="30px" height="30px" viewBox="0 0 256 256">
            <path d="M220.3,136.5l-81,81a16,16,0,0,1-22.6,0L33.6,134.4a60,60,0,0,1,2.3-87,59.5,59.5,0,0,1,87.1,2.3l7.5,7.5,9.6-9.6a60.7,60.7,0,0,1,44-17.6,59.5,59.5,0,0,1,44.5,19.9C245.6,75.2,243.7,113.2,220.3,136.5Z" />
          </svg>
        ) : (
          <svg fill="#000" width="30px" height="30px" viewBox="0 0 256 256">
            <path d="M128,226.2a20,20,0,0,1-14.1-5.8L30.7,137.3A64,64,0,0,1,33.2,44.4,62,62,0,0,1,79.2,28.8a68.7,68.7,0,0,1,44.1,20L128,53.5l6.7-6.7a64,64,0,0,1,92.9,2.5A62,62,0,0,1,243.2,95.2a68.7,68.7,0,0,1-20,44.1l-81,81A20,20,0,0,1,128,226.2Z" />
          </svg>
        )}
      </button>
      <span className="text-lg font-semibold">{likeCount}</span>
    </div>
  );
}
