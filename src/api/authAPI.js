import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fsignOut,
} from "firebase/auth";
import firebaseConfig from "../config/firebaseConfig";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";

// Your web app's Firebase configuration

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// Sign up with email and password

export const signUpWithEmailPassword = async (name, email, password) => {
  try {
    // Firebase auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    toast.success("User created successfully", user);
    // Create new enrty for user in firestore

    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      createdAt: new Date().toISOString(),
    });

    return user.uid;
  } catch (error) {
    throw error;
  }
};

// Sign in with email and password
export const signInWithEmailPassword = async (email, password) => {
  try {
    console.log("Trying to sign in user... ");

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User signed in: ", userCredential.user);

    return userCredential.user.uid;
  } catch (error) {
    throw error;
  }
};

// Sign out
export const signOut = async () => {
  try {
    await fsignOut();
  } catch (error) {
    throw error;
  }
};
