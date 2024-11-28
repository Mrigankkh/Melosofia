import React from "react";
import {  Box, Typography } from "@mui/material";

const About = () => {
  return (
    <Box className = "page"
    
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
        className="about-header"
        sx={{ textAlign: "center", padding: 2 }}
      >
        <Typography variant="h1">About Melosofia</Typography>
      </Box>
      <Box component="section" className="about-content" sx={{ padding: 2 }}>
        <Typography variant="h5" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph>
          Melosofia is dedicated to exploring the intersection of music and philosophy. We aim to create a space where music lovers can share their interpretations, discover new perspectives, and engage in thoughtful discussions about the lyrical depth of their favorite songs.
        </Typography>
        <Typography variant="h5" gutterBottom>
          Join Our Community
        </Typography>
        <Typography variant="body1" paragraph>
          Become a part of our growing community where you can connect with fellow music enthusiasts. Share your thoughts, interpretations, and insights about songs, and enjoy a collaborative experience that celebrates the beauty of music.
        </Typography>
        <Typography variant="h5" gutterBottom>
          Get Involved
        </Typography>
        <Typography variant="body1" paragraph>
          We encourage you to participate by adding your interpretations and engaging with others. Whether you’re here to share your insights or to learn from others, there’s a place for you in Melosofia.
        </Typography>
      </Box>
      <Box
        component="footer"
        className="about-footer"
        sx={{ textAlign: "center", padding: 2 }}
      >
        <Typography variant="body2">
          &copy; 2023 Melosofia. All rights reserved.
        </Typography>
      </Box>
    </Box>
   
  );
};

export default About;
