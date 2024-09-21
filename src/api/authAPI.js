import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as fsignOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAKpbJGVdnKFE3AAsfIJ7R3dFCGG_U0dic",
    authDomain: "melosofia-1705d.firebaseapp.com",
    projectId: "melosofia-1705d",
    storageBucket: "melosofia-1705d.appspot.com",
    messagingSenderId: "407487015102",
    appId: "1:407487015102:web:2df9ab3be53e365c7456ef"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Sign up with email and password

export const signUpWithEmailPassword = async (email, password) => {
    try {

        const userCredential = await createUserWithEmailAndPassword(email, password);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};

// Sign in with email and password
export const signInWithEmailPassword = async (email, password) => {
    try {
        console.log('Trying to sign in user... ');

        const userCredential = await signInWithEmailAndPassword(auth,email, password);
        console.log('User signed in: ', userCredential.user);

        return userCredential.user;
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