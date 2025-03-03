"use client"
import Image from 'next/image'
import React from 'react'
import { useSession } from "next-auth/react"
// import { doc, getFirestore, setDoc } from "firebase/firestore";
// import app from './../Shared/firebaseConfig'
// import { useRouter } from 'next/navigation';
import { AppBar, Toolbar, IconButton, Button, InputBase, Avatar } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';

function Header() {
  const { data: session } = useSession();
//   const router = useRouter();
//   const db = getFirestore(app);

//   useEffect(() => {
//     if (session?.user) {
//       setDoc(doc(db, "user", session.user.email), {
//         userName: session.user.name,
//         email: session.user.email,
//         userImage: session.user.image
//       });
//     }
//   }, [session]);

  return (
    <AppBar position="static" color="default" sx={{ padding: '10px' }}>
      <Toolbar className='flex justify-between'>
        <IconButton edge="start" color="inherit" className="rounded-full overflow-hidden">
            <Image src='/logo.png' alt='logo' width={60} height={60} className="rounded-full" />
        </IconButton>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
            <a
                className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-black hover:text-white text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-32"
                href="#"
            >
                Home
            </a>
            <a
                className="rounded-full border border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-black hover:text-white text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-32"
                href="#"
            >
                Create
            </a>
        </div>


        <div className='flex bg-gray-200 rounded-full p-2 items-center w-full max-w-md hidden md:flex'>
          <SearchIcon className='text-gray-500' />
          <InputBase placeholder='Search' className='ml-2 w-full' />
        </div>
        <IconButton color="inherit" sx={{ display: { xs: 'block', md: 'none' } }}>
            <SearchIcon />
        </IconButton>
        <IconButton color="inherit">
          <NotificationsIcon />
        </IconButton>
        <IconButton color="inherit">
          <ChatIcon />
        </IconButton>
        {session?.user ? (
          <Avatar src="" alt='user-avatar' />
        ) : (
            <a
                className="rounded-full border border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-black hover:text-white text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-32"
                href="#"
            >
                Create
            </a>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header
