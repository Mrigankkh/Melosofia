import "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../config/firebaseConfig";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  startAt,
  endAt,
  where,
} from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const fetchSongFromId = async (id) => {
  console.log('In song API')
  const songsRef = collection(db, "songs");
  console.log("Songs Ref", songsRef);

  const q = query(
    songsRef,
    where("song_id", "==", id)
  );

  try {
    const snapshot = await getDocs(q);
    const songs = snapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    console.log("Songs:", songs);
    return songs;
  } catch (error) {
    console.error("Error fetching interpretations:", error);
  }
}


const fetchSongs = async (title) => {

  const songsRef = collection(db, "songs");
  console.log("Songs Ref", songsRef);

  const q = query(
    songsRef,
    orderBy("title"),
    startAt(title),
    endAt(title + "\uf8ff")
  );

  try {
    const snapshot = await getDocs(q);
    const songs = snapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    console.log("Songs:", songs);
    return songs;
  } catch (error) {
    console.error("Error fetching interpretations:", error);
  }
};

export { fetchSongs, fetchSongFromId };