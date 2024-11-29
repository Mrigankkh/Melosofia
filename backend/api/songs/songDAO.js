import get_db from "../../db/db.js";
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
    const db = get_db();
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
