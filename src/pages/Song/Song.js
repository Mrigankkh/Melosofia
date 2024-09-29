// import React, { useEffect, useState, } from "react";
// import { useParams } from "react-router-dom";
// import { Box, Typography, Button } from "@mui/material";
import AddInterpretationModal from "./inpretationsModal"; // Import the modal
// import { getInterpretationsForSong } from "../../api/interpretationsAPI";
// import { getLyrics } from "../../api/lyricsAPI";
// import Grid from "@mui/material/Grid2";
// const Song = () => {
//   const { song_id } = useParams();

//   console.log("Song ID: ", song_id);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [interpretations, setInterpretations] = useState([]);
//   const [lyrics, setLyrics] = useState("");

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleAddInterpretation = (newInterpretation) => {
//     setInterpretations([...interpretations, newInterpretation]);
//   };

//   const fetchInterpretations = async () => {
//     const fetchedInterpretations = await getInterpretationsForSong(song_id);
//     setInterpretations(fetchedInterpretations || []);
//   };
//   const fetchLyrics = async () => {
//     const fetchedLyrics = await getLyrics(song_id);
//     setLyrics(fetchedLyrics || "Lyrics not found");
//   };

//   useEffect(() => {
//     fetchLyrics();
//   }, [song_id]);

//   useEffect(() => {
//     fetchInterpretations();
//   }, [song_id]);

//   return (
//     <Box
//       sx={{
//         padding: 3,
//         display: "flex",
//         justifyContent: "center", // Center horizontally
//         alignItems: "center", // Center vertically if needed
//         minHeight: "100vh", // Optional: makes it full height
//       }}
//     >
//       <Grid container spacing={3}>
//         {/* Left Section: Song Lyrics */}
//         <Grid item>
//           <Typography variant="h4" gutterBottom></Typography>
//           <Typography variant="h6" gutterBottom></Typography>
//           <Typography variant="body1" component="pre">
//             {lyrics}
//           </Typography>
//         </Grid>

//         {/* Right Section: Interpretations */}
//         <Grid item>
//           <Typography variant="h5" gutterBottom>
//             User Interpretations
//           </Typography>
//           {interpretations.length > 0 ? (
//             <ul>
//               {interpretations.map((interpretation, index) => (
//                 <li key={index}>
//                   <Typography variant="h6</li>">
//                     {interpretation.user_id}
//                   </Typography>
//                   <Typography variant="body1">
//                     {interpretation.interpretation_text}
//                   </Typography>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <Typography>No interpretations yet.</Typography>
//           )}

//           {/* Button to open modal */}
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleOpenModal}
//             sx={{ marginTop: 2 }}
//           >
//             Add Interpretation
//           </Button>

//           {/* Modal for adding interpretation */}
//           <AddInterpretationModal
//             open={isModalOpen}
//             onClose={handleCloseModal}
//             onSubmit={handleAddInterpretation}
//           />
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Song;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button , Paper} from "@mui/material";
import { getInterpretationsForSong } from "../../api/interpretationsAPI";
import { getLyrics } from "../../api/lyricsAPI";
import Grid from "@mui/material/Grid";

const Song = () => {
  const { song_id } = useParams();

  console.log("Song ID: ", song_id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [interpretations, setInterpretations] = useState([]);
  const [lyrics, setLyrics] = useState("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddInterpretation = (newInterpretation) => {
    setInterpretations([...interpretations, newInterpretation]);
  };

  const fetchInterpretations = async () => {
    const fetchedInterpretations = await getInterpretationsForSong(song_id);
    setInterpretations(fetchedInterpretations || []);
  };
  
  const fetchLyrics = async () => {
    const fetchedLyrics = await getLyrics(song_id);
    setLyrics(fetchedLyrics || "Lyrics not found");
  };

  useEffect(() => {
    fetchLyrics();
    fetchInterpretations();
  }, [song_id]);

  return (
    <Box
      sx={{
        padding: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start", // Align to the start
        minHeight: "100vh",
        backgroundColor: "#000", // Background color to match theme
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")', // Background texture
        color: "#fff", // Text color
      }}
    >
      <Grid container spacing={3} sx={{ maxWidth: '1200px', width: '100%' }}>
        {/* Left Section: Song Lyrics */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Song Lyrics
          </Typography>
          <Typography variant="body1" component="pre" sx={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
            {lyrics}
          </Typography>
        </Grid>

        {/* Right Section: Interpretations */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            User Interpretations
          </Typography>
          {interpretations.length > 0 ? (
            <ul style={{ paddingLeft: 0 }}>
              {interpretations.map((interpretation, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>
                             <Paper elevation={3} sx={{ padding: 2, backgroundColor: "#222" }}>
                    <Typography variant="h6" sx={{ color: "#fff" }}>
                      {interpretation.user_id}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#ddd" }}>
                      {interpretation.interpretation_text}
                    </Typography>
                  </Paper>
                </li>
              ))}
            </ul>
          ) : (
            <Typography>No interpretations yet.</Typography>
          )}

          {/* Button to open modal */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenModal}
            sx={{ marginTop: 2 }}
          >
            Add Interpretation
          </Button>

          {/* Modal for adding interpretation */}
          <AddInterpretationModal
            open={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleAddInterpretation}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Song;
