"use client"
import React from 'react'
import { useEffect } from 'react'
import { doc, getDoc, getFirestore } from "firebase/firestore";
import app from "../Shared/firebaseConfig";

function Profile({params}) {
    const db = getFirestore(app);
    
    useEffect(() => {
        console.log(params.userId.replace('%40', '@'))
        if(params){
            getUserInfo(params.userId.replace('%40', '@'));
        }
    }, [params])

    const getUserInfo = async (email) => {
        const docRef = doc(db, "user", email);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
    }

    return (
        <div>Profile</div>
    )
}

export default Profile