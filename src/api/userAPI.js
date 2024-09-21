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
  getDoc,doc,
  query,
  where,
} from "firebase/firestore";

export const fetchUserData = async (userId) => {

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    try {
        const userDoc = await getDoc(doc(db,'users', userId));
        if (userDoc.exists) {
            return userDoc.data(); // Return user data as an object
        } else {
            throw new Error("User not found");
        }
    } catch (error) {
        throw error; // Handle errors appropriately
    }
};