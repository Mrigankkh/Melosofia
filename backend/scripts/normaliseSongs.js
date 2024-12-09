

import admin from '../firebase/firebaseAdmin.js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const songsFilePath = path.join(__dirname, 'initData/interpretations.json');
const songs = JSON.parse(fs.readFileSync(songsFilePath, 'utf8'));
const db = admin.firestore();

const normalizeSongsCollection = async () => {
    const songsCollection = db.collection('songs');
  
    try {
      // Fetch all documents in the "songs" collection
      const snapshot = await songsCollection.get();
      if (snapshot.empty) {
        console.log('No documents found in the "songs" collection.');
        return;
      }
  
      // Loop through each document
      const updatePromises = snapshot.docs.map(async (doc) => {
        const data = doc.data();
        const normalizedData = {};
  
        // Convert all fields to lowercase, except the document ID
        for (const key in data) {
          if (typeof data[key] === 'string') {
            normalizedData[key] = data[key].toLowerCase();
          } else {
            normalizedData[key] = data[key]; // Keep non-string fields unchanged
          }
        }
  
        // Update the document with the normalized data
        return songsCollection.doc(doc.id).update(normalizedData);
      });
  
      // Wait for all updates to complete
      await Promise.all(updatePromises);
  
      console.log('All documents in the "songs" collection have been normalized.');
    } catch (error) {
      console.error('Error normalizing documents:', error);
    }
  };
  
  // Execute the script
  normalizeSongsCollection();