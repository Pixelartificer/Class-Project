// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJMxLpZRMjGZxPRSsFDByl9GvegUT5FBI",
  authDomain: "chat-project-2403.firebaseapp.com",
  databaseURL: "https://chat-project-2403-default-rtdb.firebaseio.com",
  projectId: "chat-project-2403",
  storageBucket: "chat-project-2403.firebasestorage.app",
  messagingSenderId: "34765460725",
  appId: "1:34765460725:web:805497fde346ba178ba1bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

