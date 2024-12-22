// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword, // Import signInWithEmailAndPassword
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJoRPXIndEb2r6FArC2-sFjBegBkSygpA",
  authDomain: "konsulq-bb1ee.firebaseapp.com",
  projectId: "konsulq-bb1ee",
  storageBucket: "konsulq-bb1ee.firebasestorage.app",
  messagingSenderId: "566138149871",
  appId: "1:566138149871:web:886878dd18fbb4a6c2b41a",
  measurementId: "G-C1ZVYVKD7G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// Export auth, provider, signInWithPopup, signInWithEmailAndPassword, and db
export { auth, provider, signInWithPopup, signInWithEmailAndPassword, db };
