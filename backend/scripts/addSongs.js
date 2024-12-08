
import admin from '../firebase/firebaseAdmin.js';
import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const songsFilePath = path.join(__dirname, 'initData/songs.json');
const songs = JSON.parse(fs.readFileSync(songsFilePath, 'utf8'));
const db = admin.firestore();

// Song data to upload

// Function to upload songs to Firestore
async function uploadSongs() {
  for (let song of songs) {
    try {
      await db.collection('songs').doc(song.song_id).set(song);
      console.log(`Song "${song.title}" by ${song.artist} added successfully.`);
    } catch (error) {
      console.error(`Error adding song "${song.title}": `, error);
    }
  }
}

// Run the function to upload songs
uploadSongs();
