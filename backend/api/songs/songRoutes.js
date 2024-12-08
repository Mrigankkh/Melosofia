import { getVerifiedUser } from "../../utils/utils.js";
import * as songDAO from "./songDAO.js";
export default function songRoutes(app) {
  app.get("/songs/search", getVerifiedUser, async (req, res) => {
    try {
      
      const title = req.query.title;
      const songs = await songDAO.getSongsByTitle(title);
      res.json(songs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/songs/:id/interpretations", getVerifiedUser, async (req, res) => {
    try {
      console.log("Getting interpretations for song with id:", req.params.id);
      const songId = req.params.id;
      const interpretations = await songDAO.getInterpretationsBySongId(songId);
      res.json(interpretations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  const fetchSongs = async (title) => {

    const songsRef = collection(db, "songs");
    console.log("Songs Ref", songsRef);
  
    const q = query(
      songsRef,
      orderBy("title"),
      startAt(title),
      endAt(title + "\uf8ff")
    );
  
    try {
      const snapshot = await getDocs(q);
      const songs = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      console.log("Songs:", songs);
      return songs;
    } catch (error) {
      console.error("Error fetching interpretations:", error);
    }
  };
}
