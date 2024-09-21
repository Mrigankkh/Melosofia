import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as fsignOut } from "firebase/auth";
import firebaseConfig from '../config/firebaseConfig'
// Your web app's Firebase configuration


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