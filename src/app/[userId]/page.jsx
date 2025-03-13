"use client";
import React, { useState, useEffect } from 'react';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import app from "../Shared/firebaseConfig";
import UserInfo from '../components/UserInfo';
import PinList from '../components/Pins/PinList';

function Profile({ params }) {
  const db = getFirestore(app);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const fetchParams = async () => {
      const unwrappedParams = await params;
      if (unwrappedParams) {
        getUserInfo(unwrappedParams.userId.replace('%40', '@'));
      }
    };
    fetchParams();
  }, [params]);

  const getUserInfo = async (email) => {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserInfo(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  return (
    <div>
      {userInfo ? <UserInfo userInfo={userInfo} /> : null}
      <PinList />
    </div>
  );
}

export default Profile;