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
  getDoc,
  getDocs,
  doc,
  query,
  limit,
  where,
} from "firebase/firestore";

export const fetchUserData = async (userId) => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists) {
      return userDoc.data(); // Return user data as an object
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    throw error; // Handle errors appropriately
  }
};

//TODO: Make this restricted!
export const fetchOtherUserData = async (username) => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const usersRef = collection(db, "users");

  const q = query(usersRef, where("name", "==", username), limit(1));
  try {
    const snapshot = await getDocs(q);
    const user = snapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    return user[0];
  } catch (error) {
    console.error("Error fetching user's data:", error);
  }
};
