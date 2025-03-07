"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { AppBar, Toolbar, IconButton, InputBase, Avatar } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import app from "../Shared/firebaseConfig";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { useRouter } from "next/navigation";

function Header() {
  const { data: session } = useSession();
  const db = getFirestore(app);
  const router = useRouter();

  useEffect(() => {
    saveUserInfo();
  }, [session]);

  const saveUserInfo = async () => {
    if (!session?.user?.email) return;
    try {
      await setDoc(doc(db, "users", session.user.email), {
        userName: session.user.name,
        email: session.user.email,
        image: session.user.image,
      });
    } catch (error) {
      console.error("Error saving user info:", error);
    }
  };

  // Redirect functions
  const redirectToHome = () => router.push("/");
  const handleCreateClick = () => (session?.user ? router.push("/pin-builder") : signIn());

  return (
    <AppBar position="static" color="default" sx={{ padding: "10px", boxShadow: "none" }}>
      <Toolbar className="flex justify-between">
        {/* Logo - Click to go home */}
        <IconButton edge="start" color="inherit" className="rounded-full overflow-hidden" onClick={redirectToHome}>
          <Image src="/logo.png" alt="logo" width={60} height={60} className="rounded-full p-2" />
        </IconButton>

        {/* Navigation Links */}
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button 
            className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-black hover:text-white text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-32"
            onClick={redirectToHome} // Redirect Home
          >
            Home
          </button>
          <button
            className="rounded-full border border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-black hover:text-white text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-32"
            onClick={handleCreateClick} // Check session before redirect
          >
            Create
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex bg-gray-200 rounded-full p-2 items-center w-full max-w-md">
          <SearchIcon className="text-gray-500" />
          <InputBase placeholder="Search" className="ml-2 w-full" />
        </div>

        {/* Icons */}
        <IconButton color="inherit" sx={{ display: { xs: "block", md: "none" } }}>
          <SearchIcon />
        </IconButton>
        <IconButton color="inherit">
          <NotificationsIcon />
        </IconButton>

        {/* User Profile / Login */}
        {session?.user ? (
          <Avatar
            src={session.user.image || "/default-avatar.png"}
            alt="user-avatar"
            className="cursor-pointer"
            onClick={() => router.push(`/${session?.user?.email}`)}
          />
        ) : (
          <button
            className="rounded-full border border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-black hover:text-white text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-32"
            onClick={() => signIn()}
          >
            Login
          </button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
