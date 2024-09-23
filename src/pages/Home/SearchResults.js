import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SearchResults = ({ results }) => {
  const navigate = useNavigate();

  const handleItemClick = (song_id) => {
    navigate(`/s/${song_id}`); // Navigate to /s/song_id
  };

  return (
    <div>
      {results.length === 0 ? (
        <Typography variant="body1">No results found.</Typography>
      ) : (
        <List>
          {results.map((song) => (
            <ListItem
              key={song.song_id}
              id={song.song_id}
              button
              onClick={(e) => navigate(`/s/${song.song_id}`)} // Clickable item
              sx={{
                borderBottom: '1px solid #ddd',
                '&:hover': { backgroundColor: '#f5f5f5' }, // Hover effect
              }}
            >
              <ListItemText
                primary={song.title}
                secondary={song.artist} // Optional: Display artist as secondary text
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

 export default SearchResults;

