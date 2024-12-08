import db from "../../db/db.js";
import {
  collection,
  orderBy,
  getDocs,
  startAt,
  query,
  endAt,
} from "firebase/firestore";
export const getSongsByTitle = async (song_title) => {
  try {
    const songsRef = collection(db, "songs");
    const q = query(
      songsRef,
      orderBy("title"),
      startAt(title),
      endAt(title + "\uf8ff")
    );

    const snapshot = await getDocs(q);
    const songs = snapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    return songs;
  } catch (error) {
    console.error("Error fetching interpretations:", error);
    throw error;
  }
};


 export const getInterpretationsBySongId = async (song_id) => {

  const interpretationsRef = db.collection("interpretations");
  const snapshot = await interpretationsRef.where("song_id", "==", song_id).get();

  return await Promise.all(
    snapshot.docs.map(async (doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  );
};