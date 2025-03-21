import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Reply from "./reply";
import LikeButton from "../action/LikeButton";

export default function Comment({ comments = [], userId }) {
  const [userDetails, setUserDetails] = useState({});
  const [showPopup, setShowPopup] = useState(null);
  const [commentList, setCommentList] = useState(comments);
  const [editingComment, setEditingComment] = useState(null);
  const [editText, setEditText] = useState("");
  const [expandedComments, setExpandedComments] = useState({}); // 🆕 Thêm state theo dõi mở rộng

  const router = useRouter();

  const buildCommentTree = (comments) => {
    const commentMap = {};
    comments.forEach((comment) => {
      commentMap[comment.cid] = { ...comment, replies: [] };
    });

    const tree = [];
    comments.forEach((comment) => {
      if (comment.comment_replied_to_id) {
        if (commentMap[comment.comment_replied_to_id]) {
          commentMap[comment.comment_replied_to_id].replies.push(commentMap[comment.cid]);
        }
      } else {
        tree.push(commentMap[comment.cid]);
      }
    });

    return tree;
  };

  const commentTree = buildCommentTree(commentList);

  useEffect(() => {
    async function fetchUserData() {
      const uniqueUserIds = [...new Set(commentList.map((comment) => comment.uid))];
      const usersToFetch = uniqueUserIds.filter((id) => id && !userDetails[id]);

      if (usersToFetch.length === 0) return;

      try {
        const userResponses = await Promise.all(
          usersToFetch.map((id) =>
            fetch(`/api/users/${id}`).then((res) => (res.ok ? res.json() : null))
          )
        );

        const newUserDetails = usersToFetch.reduce((acc, id, index) => {
          if (userResponses[index]) {
            acc[id] = userResponses[index];
          }
          return acc;
        }, {});

        setUserDetails((prev) => ({ ...prev, ...newUserDetails }));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUserData();
  }, [commentList]);

  const handleEditClick = (cid, currentText) => {
    setEditingComment(cid);
    setEditText(currentText);
    setShowPopup(null);
  };

  const handleEditCancel = () => {
    setEditingComment(null);
    setEditText("");
  };

  const handleEditSave = async (cid) => {
    try {
      const response = await fetch(`/api/comment/edit/${cid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: editText }),
      });

      if (!response.ok) throw new Error("Failed to edit comment");

      const updatedComment = await response.json();

      setCommentList((prevComments) =>
        prevComments.map((comment) => (comment.cid === updatedComment.cid ? updatedComment : comment))
      );

      setEditingComment(null);
      setEditText("");
      window.location.reload();
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const handleDelete = async (cid) => {
    try {
      const response = await fetch(`/api/comment/delete/${cid}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete comment");

      setCommentList((prevComments) => prevComments.filter((comment) => comment.cid !== cid));
      setShowPopup(null);
      window.location.reload();

    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleNavigate = (username) => {
    if (username) {
      router.push(`/${username}`);
    }
  };

  const toggleReplies = (cid) => {
    setExpandedComments((prev) => ({
      ...prev,
      [cid]: !prev[cid],
    }));
  };

  const renderComments = (comments, level = 0) => {
    return comments.map((comment) => {
      const user = userDetails[comment.uid] || {};

      return (
        <div key={comment.cid} className={`mb-4 p-4 bg-white shadow rounded-lg ${level > 0 ? "ml-8" : ""}`}>
          <div className="flex items-center space-x-3">
            {user.avatar_image ? (
              <img
                onClick={() => handleNavigate(user.username)}
                src={user.avatar_image}
                alt="Avatar"
                className="cursor-pointer w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
            )}

            <div className="flex flex-col w-full">
              <span className="font-semibold cursor-pointer" onClick={() => handleNavigate(user.username)}>
                {user.username ? user.username : "Loading..."}
              </span>

              {editingComment === comment.cid ? (
                <div className="flex space-x-2 mt-2">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="border p-1 flex-1 rounded-md"
                  />
                  <button
                    onClick={() => handleEditSave(comment.cid)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleEditCancel}
                    className="bg-gray-400 text-white px-3 py-1 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <span>{comment.comment}</span>
              )}
            </div>
          </div>

          <div className="flex items-center mt-2 text-sm text-gray-600 space-x-4">
            <span>{new Date(comment.created_at).toLocaleDateString()}</span>
            <LikeButton cid={comment.cid} likes={comment.likes} userId={userId} />
            <button onClick={() => setShowPopup(comment.cid)} className="hover:text-gray-800">
              Reply
            </button>

            {showPopup === comment.cid && (
              <Reply parentCommentId={comment.cid} pid={comment.pid} userId={userId} />
            )}

            {comment.uid === userId && (
              <div className="flex space-x-2">
                <button onClick={() => handleEditClick(comment.cid, comment.comment)} className="px-3 py-1 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md transition">
                  Edit
                </button>
                <button onClick={() => handleDelete(comment.cid)} className="px-3 py-1 text-red-600 hover:text-red-800 border border-red-300 rounded-md transition">
                  Delete
                </button>
              </div>
            )}
          </div>

          {comment.replies.length > 0 && (
            <button className="text-blue-500 text-sm mt-2" onClick={() => toggleReplies(comment.cid)}>
              {expandedComments[comment.cid] ? `Hide ${comment.replies.length} replies` : `View ${comment.replies.length} replies`}
            </button>
          )}

          {expandedComments[comment.cid] && comment.replies.length > 0 && (
            <div className="mt-4">{renderComments(comment.replies, level + 1)}</div>
          )}
        </div>
      );
    });
  };

  return <div className="max-h-96 overflow-y-auto pr-2">{commentTree.length === 0 ? <p>No comments available.</p> : renderComments(commentTree)}</div>;
}
