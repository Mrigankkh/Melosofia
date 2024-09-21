// lyricsAPI.js
import axios from 'axios';

const baseURL = 'https://api.lyrics.ovh/v1';

export const getLyrics = async (song_id) => {

    //get arrtist and title from song_id
    const artist = 'coldplay'
    const title = 'yellow'
  try {
    const response = await axios.get(`${baseURL}/${artist}/${title}`);
    return response.data.lyrics;
  } catch (error) {
    console.error('Error fetching lyrics:', error);
    return null;
  }
};
