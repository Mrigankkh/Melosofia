import React from 'react';
import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SearchResults = ({ results }) => {
  const navigate = useNavigate();

  const handleItemClick = (song_id) => {
    navigate(`/s/${song_id}`);
  };

  return (
    <Box
      sx={{
        width: '100%',
        padding: 2,
        whiteSpace: 'nowrap',
      }}
    >
      {results.length === 0 ? (
        <Typography variant="body1" sx={{ color: '#fff', textAlign: 'center', mt: 2 }}>
          No results found.
        </Typography>
      ) : (
        <List sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px' }}>
          {results.map((song) => (
            <ListItem
              key={song.song_id}
              button
              onClick={() => handleItemClick(song.song_id)}
              sx={{
                borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  transform: 'scale(1.02)',
                  transition: 'transform 0.2s',
                  width: '100%',
                },
                color: '#fff',
                fontSize: '1.2rem',
                whiteSpace: 'nowrap',
                width: '100%',
              }}
            >
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: 'bold', color: '#fff', fontSize: '1.2rem' }}>
                    {song.title}
                  </Typography>
                }
                secondary={
                  <Typography sx={{ color: '#bbb', fontSize: '1rem' }}>{song.artist}</Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default SearchResults;
