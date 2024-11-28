// deezerAPI.js
import axios from 'axios';

const deezerBaseURL = 'https://api.deezer.com';

// Function to search songs on Deezer
export const searchSongOnDeezer = async (query) => {
  try {
    // Make a search request to Deezer's API
    const response = await axios.get(`${deezerBaseURL}/search?q=${encodeURIComponent(query)}`);

    if (response.data && response.data.data.length > 0) {
      // Extract song data from the response
      const song = response.data.data[0];  // Take the first result

      const songInfo = {
        title: song.title,
        artist: song.artist.name,
        song_id: song.id
      };

      console.log('Song Info:', songInfo);
      return songInfo;
    } else {
      console.log('No songs found for this query');
      return null;
    }
  } catch (error) {
    console.error('Error searching song on Deezer:', error);
    return null;
  }
};
