// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJAg2vm1ZMoPUckzKvn3gR_jZ49slL-Ps",
  authDomain: "attendanceplannerqe.firebaseapp.com",
  projectId: "attendanceplannerqe",
  storageBucket: "attendanceplannerqe.appspot.com",
  messagingSenderId: "492026326421",
  appId: "1:492026326421:web:d7ed7796bf868f02a39a9c",
  measurementId: "G-WV5CF6VT6Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// ✅ Initialize Firestore and export it
export const db = getFirestore(app);