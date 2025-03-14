"use client";
import { useState, useEffect } from "react";

export default function Comment({ comments = [], userId }) {
  const [heartClicked, setHeartClicked] = useState({});
  const [likes, setLikes] = useState({});
  const [userDetails, setUserDetails] = useState({}); // Store user details

  useEffect(() => {
    async function fetchUserData() {
      const uniqueUserIds = [...new Set(comments.map((comment) => comment.uid))]; // Get unique userIds
      const usersToFetch = uniqueUserIds.filter((id) => id && !userDetails[id]); // Only fetch missing users

      if (usersToFetch.length === 0) return; // If no users need fetching, stop

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

        console.log("Fetched user details:", newUserDetails); // Log fetched user details

        setUserDetails((prev) => ({ ...prev, ...newUserDetails })); // Update state with new user data
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUserData();
  }, [comments]); // Re-run when comments change

  const handleHeartClick = (cid) => {
    setHeartClicked((prev) => ({ ...prev, [cid]: !prev[cid] }));
    setLikes((prev) => ({ ...prev, [cid]: prev[cid] ? prev[cid] - 1 : (prev[cid] || 0) + 1 }));
  };

  console.log("Comments:", comments); // Log comments to check if they are being passed correctly
  console.log("User Details:", userDetails); // Log user details to check if they are being updated correctly

  return (
    <div className="max-h-96 overflow-y-auto pr-2">
      {comments.length === 0 ? (
        <p>No comments available.</p>
      ) : (
        comments.map((comment) => {
          const user = userDetails[comment.uid] || {}; // Get user data
          console.log("Rendering comment for user:", user); // Log user data for each comment

          return (
            <div key={comment.cid} className="mb-8 bg-white shadow rounded-lg p-4">
              <div className="flex items-center space-x-3">
                {/* Display Avatar */}
                {user.avatar_image ? (
                  <img src={user.avatar_image} alt="Avatar" className="w-8 h-8 rounded-full" />
                ) : (
                  <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div> // Loading placeholder
                )}

                <div className="flex flex-col">
                  {/* Display Username */}
                  <span className="font-semibold">
                    {user.username ? user.username : "Loading..."}
                  </span>
                  <span>{comment.comment}</span>
                </div>
              </div>

              <div className="flex items-center mt-2 text-sm text-gray-600 space-x-4">
                <span>{new Date(comment.created_at).toLocaleDateString()}</span>
                <button className="hover:text-gray-800">Reply</button>

                <div className="flex items-center space-x-1">
                  <button onClick={() => handleHeartClick(comment.cid)} className="hover:bg-gray-200 p-1 rounded-full">
                    {heartClicked[comment.cid] ? (
                      <svg fill="#ff4d4d" width="20" height="20" viewBox="0 0 256 256">
                        <path d="M220.3,136.5l-81,81a16,16,0,0,1-22.6,0L33.6,134.4a60,60,0,0,1,2.3-87,59.5,59.5,0,0,1,87.1,2.3l7.5,7.5,9.6-9.6a60.7,60.7,0,0,1,44-17.6,59.5,59.5,0,0,1,44.5,19.9C245.6,75.2,243.7,113.2,220.3,136.5Z"/>
                      </svg>
                    ) : (
                      <svg fill="black" width="20" height="20" viewBox="0 0 256 256">
                        <path d="M128,226.2a20,20,0,0,1-14.1-5.8L30.7,137.3A64,64,0,0,1,33.2,44.4,62,62,0,0,1,79.2,28.8a68.7,68.7,0,0,1,44.1,20L128,53.5l6.7-6.7a64,64,0,0,1,92.9,2.5A62,62,0,0,1,243.2,95.2a68.7,68.7,0,0,1-20,44.1l-81,81A20,20,0,0,1,128,226.2Z"/>
                      </svg>
                    )}
                  </button>
                  {likes[comment.cid] > 0 && <span>{likes[comment.cid]}</span>}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}