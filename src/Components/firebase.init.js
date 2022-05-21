import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKS3JLvSrW0-AnzfjSflFsomxbT9yZOW4",
  authDomain: "tools-manufacturer.firebaseapp.com",
  projectId: "tools-manufacturer",
  storageBucket: "tools-manufacturer.appspot.com",
  messagingSenderId: "919093893327",
  appId: "1:919093893327:web:62735d561f46c1a69e3fba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth; 