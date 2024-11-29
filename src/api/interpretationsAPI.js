import "firebase/firestore";
import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../config/firebaseConfig";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  setDoc,
  addDoc,
  doc,
  
} from "firebase/firestore";
import {fetchSongFromId} from './songAPI';
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const addInterpretation = async (interpretation, song_id, user) => {

  try {
  
    console.log("Adding interpretation... Song id:", song_id);
    await addDoc(collection(db, "interpretations" ), {
      interpretation_text: interpretation,
      song_id: song_id,
      user_id: user._id,
      username: user.name,
      createdAt: new Date().toISOString(),
    });

  } catch (error) {
    console.error("Error adding interpretation:", error);
  }
};

const getInterpretationsForSong = async (songId) => {
  const interpretationsRef = collection(db, "interpretations");
  console.log("Interpretations Ref", interpretationsRef);

  const q = query(interpretationsRef, where("song_id", "==", "1"));
  console.log("Query", q);

  try {
    const snapshot = await getDocs(q);
    const interpretations = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Interpretations:", interpretations);
    return interpretations;
  } catch (error) {
    console.error("Error fetching interpretations:", error);
  }
};

const getInterpretationsForUser = async (username) => {
  const interpretationsRef = collection(db, "interpretations");

  const q = query(interpretationsRef, where("username", "==", username));

  try {
    const snapshot = await getDocs(q);
    const interpretations = await Promise.all(
      snapshot.docs.map(async (doc) => ({
        id: doc.id,
        ...doc.data(),
        song: await fetchSongFromId(doc.data().song_id),
      }))
    );
    console.log("Interpretations:", interpretations);
    return interpretations;
  } catch (error) {
    console.error("Error fetching interpretations:", error);
  }
};


export { getInterpretationsForUser,getInterpretationsForSong, addInterpretation };
