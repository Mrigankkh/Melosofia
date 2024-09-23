// lyricsAPI.js
import axios from 'axios';
import { fetchSongFromId } from './songAPI';
const baseURL = 'https://api.lyrics.ovh/v1';

export const getLyrics = async (song_id) => {

    //get arrtist and title from song_id

  try {
    console.log('In lyrics API')
    const song = await fetchSongFromId(song_id)
    console.log('Song in lyrics api is:',song)
    const artist = song[0].artist;
    const title = song[0].title;

    const response = await axios.get(`${baseURL}/${artist}/${title}`);
    console.log('Lyrics:',response.data.lyrics)
    return response.data.lyrics;
  } catch (error) {
    console.error('Error fetching lyrics:', error);
    return null;
  }
};
