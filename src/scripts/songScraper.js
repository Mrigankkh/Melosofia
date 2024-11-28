// scraper.js
import { searchSongOnDeezer } from './deezerAPI';
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../config/firebaseConfig";
import {
  getFirestore,

} from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const songsCollection = db.collection('songs');