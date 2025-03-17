import React from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ShareButton from "../action/ShareButton";
import { Share } from "next/font/google";

function UserInfo({ userInfo }) {
  const router = useRouter();
  const { data: session } = useSession();

  const onLogoutClick = () => {
    signOut({ callbackUrl: "/" }); // Ensure redirection after logout
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <Image
        src={userInfo.image || "/default-avatar.png"} // Default image fallback
        alt="User Image"
        width={100}
        height={100}
        className="w-36 h-36 rounded-full object-cover"
      />

      <h2 className="text-[30px] font-semibold">{userInfo.userName}</h2>
      <h2 className="text-gray-400">{userInfo.email}</h2>

      <div className="flex gap-4 mb-2">
        <div className="p-2 px-3 font-semibold mt-5 rounded-full cursor-pointer">
          <ShareButton link={window.location.href} message={"Check this user profile!"}/>
        </div>
        <button className="bg-gray-200 p-2 px-3 font-semibold mt-5 rounded-full cursor-pointer">
          Saved
        </button>
        
        {session?.user?.email === userInfo.email && (
          <button
            className="bg-gray-200 p-2 px-3 font-semibold mt-5 rounded-full cursor-pointer"
            onClick={onLogoutClick}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default UserInfo;
