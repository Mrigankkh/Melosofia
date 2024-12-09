import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { InputAdornment, InputBase, Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useDebounce from "../../hooks/useDebounce";
import { fetchSongs } from "../../api/songAPI";
import SearchResults from "./SearchResults";

const Home = () => {
  const user = useSelector((state) => state.auth.user);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [songsSearchResult, setSongsSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const getSongsSearchResult = async () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      const songs = await fetchSongs(searchTerm);
      setSongsSearchResult(songs);
      console.log("Songs search result: ", songs);
    } catch (error) {
      console.error("Error fetching songs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log("Searching for: ", debouncedSearchTerm);
      getSongsSearchResult();
    }
  }, [debouncedSearchTerm]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
        backgroundImage:
          'url("https://www.transparenttextures.com/patterns/stardust.png")',
        backgroundSize: "cover",
        color: "#fff",
        textAlign: "center",
        padding: 0, // Remove default padding
        margin: 0, // Remove default margin
        width: "100%", // Full width to avoid white spaces
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        sx={{ mb: 4, fontFamily: "Cyberpr Music", fontWeight: "bold" }}
      >
        Welcome to Melosofia
      </Typography>
      <Typography variant="h6" component="p" sx={{ mb: 4 }}>
        Music is interpretive. Search for a song to get started!
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb={4}
        sx={{ width: "100%" }}
      >
        <InputBase
          placeholder="Search…"
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              getSongsSearchResult();
            }
          }}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#fff" }} />
            </InputAdornment>
          }
          sx={{
            width: "50%",
            border: "1px solid #555",
            borderRadius: "4px",
            padding: "10px 20px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            "& input": {
              color: "#fff",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#555",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#fff",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#fff",
            },
          }}
        />
      </Box>
      <div id='search-results' style={{width:'50%'}}>
        {isLoading && <div>Loading...</div>}
        {!isLoading && hasSearched && songsSearchResult.length > 0 && (
          <SearchResults results={songsSearchResult} />
        )}
        {!isLoading && hasSearched && songsSearchResult.length === 0 && (
          <div>No results found.</div>
        )}
      </div>
    </Box>
  );
};

export default Home;
