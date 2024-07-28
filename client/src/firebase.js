// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "easypg-2b0ff.firebaseapp.com",
  projectId: "easypg-2b0ff",
  storageBucket: "easypg-2b0ff.appspot.com",
  messagingSenderId: "684308071204",
  appId: "1:684308071204:web:ade31188c229dd6afda9b1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);