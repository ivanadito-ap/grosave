// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC7h9MZdxG32Iyx9D_V7urcRGsX1Mio41g",
  authDomain: "grosave-d4a4b.firebaseapp.com", // 👈 MUST be here
  projectId: "grosave-d4a4b",
  storageBucket: "grosave-d4a4b.firebasestorage.app",
  messagingSenderId: "589110361745",
  appId: "1:589110361745:web:c52ca25e463cd7ead60930"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
