import  "firebase/firestore";
import firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import firebaseConfig from '../config/firebaseConfig';
import { getFirestore, collection, getDocs, query,where } from "firebase/firestore";

const app  = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const getInterpretationsForSong = async (songId) => {

    
    const interpretationsRef = collection(db, 'interpretations');
    console.log('Interpretations Ref',interpretationsRef);

    const q = query(interpretationsRef, where('song_id', '==', '1'));
    console.log('Query',q);

    try {
        const snapshot = await getDocs(q);
        const interpretations = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Interpretations:', interpretations);
        return interpretations;
      } catch (error) {
        console.error('Error fetching interpretations:', error);
      }
    
  };

