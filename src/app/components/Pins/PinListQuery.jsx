"use client";

import React, { useEffect, useState } from "react";
import PinItem from "./PinItem";

function PinListSearch({ pid }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (pid.length > 0) {
      Promise.all(
        pid.map((post) =>
          fetch(`/api/pins/${post.pid}`)
            .then((res) => res.json())
            .catch((err) => {
              console.error(`Error fetching post ${post.pid}:`, err);
              return null;
            })
        )
      ).then((data) => {
        setPosts(data.filter((post) => post !== null && !post.message));
      });
    }
  }, [pid]);

  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 mt-4">
      {posts.length > 0 ? (
        posts.map((post) => <PinItem key={post.pid} pin={post} />)
      ) : (
        <p className="text-gray-500">No posts found.</p>
      )}
    </div>
  );
}

export default PinListSearch;
