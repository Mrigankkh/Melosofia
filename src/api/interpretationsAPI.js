import "firebase/firestore";
import axios from "axios";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../config/firebaseConfig";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  limit,
  orderBy,
} from "firebase/firestore";
import { fetchSongFromId } from "./songAPI";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL || "http://localhost:8000";

const addInterpretation = async (currentUser, interpretation, song_id) => {
  try {
    if (currentUser) {
      const idToken = await currentUser.getIdToken();
      console.log("token in intepretations api:", idToken);
      const userData = await axios.post(
        `${SERVER_BASE_URL}/interpretations`,
        {
          interpretation,
          song_id,
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      return userData.data;
    } else {
      console.log("No user found");
      throw new Error("No user found");
    }
  } catch (error) {
    console.log(error);
  }
  // try {
  //   console.log("Adding interpretation... Song id:", song_id);
  //   await addDoc(collection(db, "interpretations"), {
  //     interpretation_text: interpretation,
  //     song_id: song_id,
  //     user_id: user._id,
  //     username: user.name,
  //     createdAt: new Date().toISOString(),
  //   });
  // } catch (error) {
  //   console.error("Error adding interpretation:", error);
  // }
};

const getInterpretationsForSong = async (currentUser,song_id) => {
  try {

    console.log("Current user in getInterpretationsForSong:", currentUser);
    if (currentUser) {
      console.log("Getting interpretations for song frontend with id:", song_id);
      const idToken = await currentUser.getIdToken();
      console.log("token in intepretations api:", idToken);
      const interpretationData = await axios.get(
        `${SERVER_BASE_URL}/songs/${song_id}/interpretations`,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      console.log("Interpretation data:", interpretationData.data); 
      return interpretationData.data;
    } else {
      console.log("Error in retreiving interpretations");
      throw new Error("No user found");
    }
  } catch (error) {
    console.log(error);
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
const getLatestInterpretations = async (sortOption) => {
  const interpretationsRef = collection(db, "interpretations");
  const sortField = sortOption === "upvotes" ? "upvotes" : "createdAt"; // Default to "createdAt"

  const q = query(interpretationsRef, orderBy(sortField, "desc"), limit(20));
  const snapshot = await getDocs(q);
  return await Promise.all(
    snapshot.docs.map(async (doc) => ({
      id: doc.id,
      ...doc.data(),
      song: await fetchSongFromId(doc.data().song_id),
    }))
  );
};

export {
  getInterpretationsForUser,
  getInterpretationsForSong,
  addInterpretation,
  getLatestInterpretations,
};
