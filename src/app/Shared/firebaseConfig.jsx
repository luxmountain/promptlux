// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAu3JkAmxf-XwwQiD_Ch7-X6KicRfy-V8g",
  authDomain: "prompt-lux.firebaseapp.com",
  projectId: "prompt-lux",
  storageBucket: "prompt-lux.firebasestorage.app",
  messagingSenderId: "306803020547",
  appId: "1:306803020547:web:6cfd5ebef85bd1d203cf36",
  measurementId: "G-W5WGFZWLLR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;