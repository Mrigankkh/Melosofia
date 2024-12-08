import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fsignOut,
} from "firebase/auth";
import firebaseConfig from "../config/firebaseConfig";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// export const signUpWithEmailPassword = async (name, email, password) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     const user = userCredential.user;

//     await setDoc(doc(db, "users", user.uid), {
//       name,
//       email,
//       createdAt: new Date().toISOString(),
//       _id: user.uid,
//     });

//     return user.uid;
//   } catch (error) {
//     throw error;
//   }
// };

// Sign in with email and password

const retryUntilSuccess = (fn, timeout) => {
  const interval = 500; // Retry every 500ms
  const startTime = Date.now();

  return new Promise((resolve, reject) => {
    const tryFn = async () => {
      try {
        const result = await fn();
        resolve(result); // Success, resolve the promise
      } catch (error) {
        if (Date.now() - startTime >= timeout) {
          reject(new Error("Operation timed out: " + error.message)); // Timeout after 10 seconds
        } else {
          setTimeout(tryFn, interval); // Retry after interval (500ms)
        }
      }
    };

    tryFn(); // Start the first attempt
  });
};

export const signUpWithEmailPassword = async (name, email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, {
      id:user.uid,
      name,
      email,
      createdAt: new Date().toISOString(),
    });

    const userData = await retryUntilSuccess(async () => {
      const authUser = auth.currentUser;
      if (!authUser) throw new Error("User not authenticated yet.");
      setTimeout(() => console.log("User authenticated:", authUser), 10000);
      // Fetch Firestore user data
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists())
        throw new Error("User data not found in Firestore.");

      return { uid: authUser.uid, ...userDoc.data() };
    }, 10000);

    return userData; // Return the final user data
  } catch (error) {
    console.error("Error during signup:", error);
    throw error; // Rethrow the error for higher-level handling
  }
};

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
