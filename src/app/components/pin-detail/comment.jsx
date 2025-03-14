'use client';
import { useState } from 'react';

export default function ReadComment() {
  const comments = [
    { author: 'Nathan', text: 'abasdfasjdklfj' },
    { author: 'John', text: 'Nice post!' },
  ];

  const [heartClicked, setHeartClicked] = useState(Array(comments.length).fill(false));
  const [dotsClicked, setDotsClicked] = useState(Array(comments.length).fill(false));
  const [likes, setLikes] = useState(Array(comments.length).fill(0));
  const [replyIndex, setReplyIndex] = useState(null);
  const [replyText, setReplyText] = useState("");

  const handleHeartClick = (index) => {
    const updatedHeartClicked = [...heartClicked];
    const updatedLikes = [...likes];
    updatedHeartClicked[index] = !updatedHeartClicked[index];
    updatedLikes[index] = updatedHeartClicked[index] ? updatedLikes[index] + 1 : updatedLikes[index] - 1;
    setHeartClicked(updatedHeartClicked);
    setLikes(updatedLikes);
  };

  const handleDotsClick = (index) => {
    const updatedDotsClicked = [...dotsClicked];
    updatedDotsClicked[index] = !updatedDotsClicked[index];
    setDotsClicked(updatedDotsClicked);
  };

  const handleReplyClick = (index) => {
    setReplyIndex(replyIndex === index ? null : index);
  };

  return (
    <div className="max-h-96 overflow-y-auto pr-2">
      {comments.map((comment, index) => (
        <div key={index} className="mb-8 bg-white shadow rounded-lg">
          <div className="flex items-center space-x-3">
            <img src="/avatar-small.png" alt="Avatar" className="w-8 h-8 rounded-full" />
            <div className="flex flex-col">
              <span className="font-semibold">{comment.author}</span>
              <span>{comment.text}</span>
            </div>
          </div>

          <div className="flex items-center mt-2 text-sm text-gray-600 space-x-4">
            <span>1w</span>
            <button className="hover:text-gray-800" onClick={() => handleReplyClick(index)}>Reply</button>

            <div className="flex items-center space-x-1">
              <button onClick={() => handleHeartClick(index)} className="hover:bg-gray-200 p-1 rounded-full">
                {heartClicked[index] ? (
                  <svg fill="#ff4d4d" width="20" height="20" viewBox="0 0 256 256">
                    <path d="M220.3,136.5l-81,81a16,16,0,0,1-22.6,0L33.6,134.4a60,60,0,0,1,2.3-87,59.5,59.5,0,0,1,87.1,2.3l7.5,7.5,9.6-9.6a60.7,60.7,0,0,1,44-17.6,59.5,59.5,0,0,1,44.5,19.9C245.6,75.2,243.7,113.2,220.3,136.5Z"/>
                  </svg>
                ) : (
                  <svg fill="black" width="20" height="20" viewBox="0 0 256 256">
                    <path d="M128,226.2a20,20,0,0,1-14.1-5.8L30.7,137.3A64,64,0,0,1,33.2,44.4,62,62,0,0,1,79.2,28.8a68.7,68.7,0,0,1,44.1,20L128,53.5l6.7-6.7a64,64,0,0,1,92.9,2.5A62,62,0,0,1,243.2,95.2a68.7,68.7,0,0,1-20,44.1l-81,81A20,20,0,0,1,128,226.2Z"/>
                  </svg>
                )}
              </button>
              {likes[index] > 0 && <span>{likes[index]}</span>}
            </div>

            <button onClick={() => handleDotsClick(index)} className="hover:bg-gray-200 p-1 rounded-full">
              {dotsClicked[index] ? '⚫' : '⚪'}
            </button>
          </div>

          {replyIndex === index && (
            <div className="mt-3 space-y-2">
              <div className="flex items-center bg-gray-200 rounded-full p-2">
                <input
                  type="text"
                  className="flex-grow bg-transparent border-none focus:ring-0 text-sm"
                  placeholder="Write a reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <button className="p-2">
                  😊
                </button>
              </div>

              <div className="flex justify-end space-x-2">
                <button className="bg-gray-300 px-3 py-1 rounded-full" onClick={() => setReplyIndex(null)}>Cancel</button>
                <button className={`px-3 py-1 rounded-full ${replyText ? 'bg-red-500 text-white' : 'bg-gray-400 text-gray-300'}`} disabled={!replyText}>
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
