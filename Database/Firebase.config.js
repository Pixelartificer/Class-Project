// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJMxLpZRMjGZxPRSsFDByl9GvegUT5FBI",
  authDomain: "chat-project-2403.firebaseapp.com",
  projectId: "chat-project-2403",
  storageBucket: "chat-project-2403.firebasestorage.app",
  messagingSenderId: "34765460725",
  appId: "1:34765460725:web:805497fde346ba178ba1bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default app;