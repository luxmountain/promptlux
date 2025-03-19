import React from 'react'

function FollowButton({ userInfo}) {
  return (
    <button
        className="bg-red-500 text-white p-2 px-3 font-semibold mt-5 rounded-full cursor-pointer"
    >
        Follow
    </button>
  )
}

export default FollowButton