import React from 'react';
import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SearchResults = ({ results }) => {
  const navigate = useNavigate();

  const handleItemClick = (song_id) => {
    navigate(`/s/${song_id}`); // Navigate to /s/song_id
  };

  return (
    <Box 
      sx={{ 
        maxWidth: '600px', // You can adjust this as needed
        margin: '0 auto', 
        padding: 2,
        whiteSpace: 'nowrap', // Prevent wrapping of items
      }}
    >
      {results.length === 0 ? (
        <Typography variant="body1" sx={{ color: '#fff', textAlign: 'center', mt: 2 }}>
          No results found.
        </Typography>
      ) : (
        <List sx={{ display: 'inline-block', bgcolor: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px' }}>
          {results.map((song) => (
            <ListItem
              key={song.song_id}
              button
              onClick={() => handleItemClick(song.song_id)} // Clickable item
              sx={{
                borderBottom: '1px solid rgba(255, 255, 255, 0.3)', // Softer border color
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)', // Slightly lighter on hover
                  transform: 'scale(1.02)', // Subtle scaling effect on hover
                  transition: 'transform 0.2s', // Smooth transition for scaling effect
                  width: '100%', // Match the width of the container

                },
                color: '#fff', // Text color
                fontSize: '1.2rem', // Increase font size for clarity
                whiteSpace: 'nowrap', // Prevent wrapping of text
                width: '100%', // Match the width of the container

              }}
            >
              <ListItemText
                primary={<Typography sx={{ fontWeight: 'bold', color: '#fff', fontSize: '1.2rem' }}>{song.title}</Typography>} // Larger font for title
                secondary={<Typography sx={{ color: '#bbb', fontSize: '1rem' }}>{song.artist}</Typography>} // Larger font for artist
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default SearchResults;
