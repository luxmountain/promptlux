"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Comment({ comments = [], userId }) {
  const [userDetails, setUserDetails] = useState({});
  const [showPopup, setShowPopup] = useState(null);
  const [commentList, setCommentList] = useState(comments);
  const [editingComment, setEditingComment] = useState(null);
  const [editText, setEditText] = useState("");
  
  const router = useRouter();
  
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
    console.log(username);
    if (username) {
      router.push(`/${username}`);
    }
  };

  return (
    <div className="max-h-96 overflow-y-auto pr-2">
      {commentList.length === 0 ? (
        <p>No comments available.</p>
      ) : (
        commentList.map((comment) => {
          const user = userDetails[comment.uid] || {};

          return (
            <div key={comment.cid} className="mb-8 bg-white shadow rounded-lg p-4">
              <div className="flex items-center space-x-3">
                {user.avatar_image ? (
                  <img onClick={() => handleNavigate(user.username)}  src={user.avatar_image} alt="Avatar" className="cursor-pointer w-8 h-8 rounded-full" />
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
                <button className="hover:text-gray-800">Reply</button>

                {comment.uid === userId && (
                  <div className="relative">
                    <button
                      onClick={() => setShowPopup(showPopup === comment.cid ? null : comment.cid)}
                      className="hover:bg-gray-200 p-1 rounded-full cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="20px" width="20px" viewBox="0 0 16 16">
                        <path d="M8,6.5A1.5,1.5,0,1,1,6.5,8,1.5,1.5,0,0,1,8,6.5ZM.5,8A1.5,1.5,0,1,0,2,6.5,1.5,1.5,0,0,0,.5,8Zm12,0A1.5,1.5,0,1,0,14,6.5,1.5,1.5,0,0,0,12.5,8Z"/>
                      </svg>
                    </button>

                    {showPopup === comment.cid && (
                      <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2">
                        <button
                          onClick={() => handleEditClick(comment.cid, comment.comment)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(comment.cid)}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 cursor-pointer hover:bg-gray-200"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
