import { React, useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import { Typography, Container } from "@mui/material";
import { getLyrics } from "../../api/lyricsAPI";
import { getInterpretationsForSong } from "../../api/interpretationsAPI";
const Song = ({ song_id }) => {
  const [lyrics, setLyrics] = useState("");
  const [interpretations, setInterpretations] = useState([]);

  useEffect(() => {
    fetchLyrics();
  }, [song_id]);

  useEffect(() => {
    fetchInterpretations();
  }, [song_id]);

  const fetchInterpretations = async () => {
    const fetchedInterpretations = await getInterpretationsForSong(song_id);
    setInterpretations(fetchedInterpretations || []);
  };
  const fetchLyrics = async () => {
    const fetchedLyrics = await getLyrics(song_id);
    setLyrics(fetchedLyrics || "Lyrics not found");
  };
  return (
    <Container>
      <Grid container spacing={2} className="song-container">
        {/* Lyrics Column */}
        <Grid item xs={12} md={6} className="lyrics-column">
          <Typography variant="h2" gutterBottom>
            Lyrics
          </Typography>
          <Typography variant="body1" component="pre">
            {lyrics}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6} className="interpretations-column">
          <Typography variant="h2" gutterBottom>
            Interpretations
          </Typography>
            {interpretations.map((interpretation) => (
              <div key={interpretation.id}>
                <Typography variant="body1">{interpretation.user_id}</Typography>
                <Typography variant="h5">{interpretation.interpretation_text}</Typography>
              </div>
            ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Song;
