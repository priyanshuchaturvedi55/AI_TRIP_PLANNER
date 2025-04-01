// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWqObC8srTCZGPreiWDjOTKLQi1ea1CO8",
  authDomain: "ai-trip-planner-a66f9.firebaseapp.com",
  projectId: "ai-trip-planner-a66f9",
  storageBucket: "ai-trip-planner-a66f9.firebasestorage.app",
  messagingSenderId: "434278820491",
  appId: "1:434278820491:web:a2baf481c7a5840288c28e",
  measurementId: "G-V48340QRFS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);

