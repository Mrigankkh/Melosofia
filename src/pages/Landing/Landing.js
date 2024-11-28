import React from "react";
import { Box, Typography } from "@mui/material";

const Landing = () => {
  return (
    <Box
    className = "page"
      sx={{
         
        minHeight: '100vh', // Ensure full height
        backgroundColor: '#000', // Set background color to black
        backgroundSize: 'cover', // Cover the entire container
        color: '#fff', // Text color
        padding: 0, // Remove padding
        display: 'flex', // Flexbox layout for centering
        flexDirection: 'column', // Vertical alignment
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        width: '100vw', // Full width of the viewport
        position: 'relative', // For layering if needed
        overflow: 'hidden', // Hide overflow if any
      }}
    >
      <Box
        component="header"
        sx={{ textAlign: "center", padding: 2 }}
      >
        <Typography variant="h1" sx={{ fontSize: '3rem', fontFamily: 'Cyberpr Music', mb: 2 }}>
          Welcome to Melosofia
        </Typography>
      </Box>
      <Box component="section" sx={{ padding: 2, maxWidth: '1000px', textAlign: 'center' }}>
        <Typography variant="body1" sx={{ fontSize: '1.25rem', lineHeight: '1.6', color: '#ddd' }}>
          Melosofia is a platform dedicated to bringing the best of music and
          philosophy together. Discover insightful articles, engaging
          discussions, and a community of like-minded individuals who share a
          passion for the harmonious blend of melodies and wisdom.
        </Typography>
      </Box>
      <Box
        component="footer"
        sx={{ textAlign: "center", padding: 2 }}
      >
        <Typography variant="body2" sx={{ color: '#aaa' }}>
          &copy; 2024 Melosofia. Developed by Mrigank Khandelwal. 
        </Typography>
      </Box>
    </Box>
  );
};

export default Landing;
