"use client";
import React, { useState, useEffect } from 'react';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import app from "../Shared/firebaseConfig";
import UserInfo from '../components/profile/UserInfo';
import PinListUser from '../components/Pins/PinListUser';
import SavedPinList from '../components/Pins/SavedPinList';

function Profile({ params }) {
  const db = getFirestore(app);
  const [userInfo, setUserInfo] = useState();
  const [activeTab, setActiveTab] = useState('created'); // Default tab
  
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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      {userInfo ? <UserInfo userInfo={userInfo} onTabChange={handleTabChange} /> : null}
      {activeTab === 'created' && <PinListUser />}
      {activeTab === 'saved' && <SavedPinList />}
    </div>
  );
}

export default Profile;