import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { InputAdornment, InputBase, Box } from "@mui/material";
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
  const [hasSearched, setHasSearched] = useState(false); // Track if a search was initiated

  const getSongsSearchResult = async (e) => {
    if (!searchTerm.trim()) return; // Avoid empty searches

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
      // Search for debouncedSearchTerm
    }
  }, [debouncedSearchTerm]);

  return (
    <div>
      <h1>Welcome to Melosofia</h1>
      <p>Music is interpretive. Search for a song to get started!</p>
      <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
        <InputBase
          placeholder="Search…"
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              // Call your search API here
              getSongsSearchResult(searchTerm); // Example: searchSongs(searchTerm);
            }
          }}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          sx={{
            width: "50%",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "4px 8px",
          }}
        />
      </Box>
      <div>
        {/* Show loading indicator */}
        {isLoading && <div>Loading...</div>}

        {/* Only display search results after the user has searched */}
        {!isLoading && hasSearched && songsSearchResult.length > 0 && (
          <SearchResults results={songsSearchResult} />
        )}

        {/* Display message if no results were found */}
        {!isLoading && hasSearched && songsSearchResult.length === 0 && (
          <div>No results found.</div>
        )}
      </div>
    </div>
  );
};

export default Home;
