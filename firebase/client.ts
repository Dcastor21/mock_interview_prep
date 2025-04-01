// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB74BqXwhgAuKQwr7efjUIDyd5Qbsm3exc",
  authDomain: "mock-interview-prep.firebaseapp.com",
  projectId: "mock-interview-prep",
  storageBucket: "mock-interview-prep.firebasestorage.app",
  messagingSenderId: "182748254781",
  appId: "1:182748254781:web:7422154be59f29605e1054",
  measurementId: "G-M7HYFYPN4G",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
