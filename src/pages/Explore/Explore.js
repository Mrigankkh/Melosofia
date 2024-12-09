import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { getLatestInterpretations } from "../../api/interpretationsAPI"; // API to fetch interpretations

const Explore = () => {
  const [interpretations, setInterpretations] = useState([]);
  const [sortOption, setSortOption] = useState("time"); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterpretations = async () => {
      setLoading(true);
      const fetchedInterpretations = await getLatestInterpretations(sortOption);
      setInterpretations(fetchedInterpretations || []);
      setLoading(false);
    };
    fetchInterpretations();
  }, [sortOption]);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: "#121212", // Deep black for a modern theme
        backgroundImage:
          'url("https://www.transparenttextures.com/patterns/stardust.png")',
        color: "#f5f5f5", // Subtle off-white for text
        minHeight: "100vh",
      }}
    >
      {/* Heading Section */}
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          marginBottom: 2,
          fontWeight: "bold",
          color: "#ffffff", // Clean white for the main heading
          textShadow: "2px 2px 6px rgba(0, 0, 0, 0.8)", // Slight shadow for depth
        }}
      >
        Explore Interpretations
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          textAlign: "center",
          marginBottom: 3,
          fontStyle: "italic",
          color: "#d0d0d0", // Subtle gray for the subtitle
        }}
      >
        Dive into the latest perspectives on your favorite lyrics.
      </Typography>

      {/* Sorting Options */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#f5f5f5" }}>
          Latest Interpretations
        </Typography>
        <Select
          value={sortOption}
          onChange={handleSortChange}
          sx={{
            color: "#f5f5f5",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#f5f5f5",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#a0a0a0",
            },
            "& .MuiSvgIcon-root": {
              color: "#f5f5f5",
            },
          }}
        >
          <MenuItem value="time">Sort by Time</MenuItem>
          <MenuItem value="upvotes">Sort by Upvotes</MenuItem>
        </Select>
      </Box>

      {/* Interpretations List */}
      {loading ? (
        <Box sx={{ textAlign: "center", marginTop: 3 }}>
          <CircularProgress sx={{ color: "#f5f5f5" }} />
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {interpretations.length > 0 ? (
            interpretations.map((interpretation) => (
              <Paper
                elevation={3}
                sx={{
                  padding: 3,
                  borderRadius: "8px",
                  backgroundColor: "#1e1e1e",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
                  border: "1px solid #333",
                  marginBottom: 3,
                }}
              >
                {/* Title and Date on the Same Row */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  {/* Song Title */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#ffffff",
                    }}
                  >
                    {interpretation?.song[0]?.title}
                  </Typography>

                  {/* Date */}
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#a8a8a8", // Subtle gray
                      fontStyle: "italic",
                    }}
                  >
                    {new Date(interpretation.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>

                {/* Artist Name */}
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontStyle: "italic",
                    color: "#a8a8a8",
                    marginBottom: "8px",
                  }}
                >
                  {interpretation?.song[0]?.artist || "Unknown Artist"}
                </Typography>

                {/* Interpretation Text */}
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.6,
                    color: "#f0f0f0",
                    marginBottom: "12px",
                  }}
                >
                  {interpretation.interpretation_text}
                </Typography>

                {/* Username */}
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    textAlign: "right",
                    color: "#a0a0a0",
                    fontStyle: "italic",
                  }}
                >
                  By {interpretation.username || "Anonymous"}
                </Typography>
              </Paper>
            ))
          ) : (
            <Typography sx={{ textAlign: "center", marginTop: 3 }}>
              No interpretations found.
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Explore;
