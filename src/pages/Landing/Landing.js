import React from "react";
import { Container, Box, Typography } from "@mui/material";

const Landing = () => {
  return (
    <Container className="landing-container">
      <Box
        component="header"
        className="landing-header"
        sx={{ textAlign: "center", padding: 2 }}
      >
        <Typography variant="h1">Welcome to Melosofia</Typography>
      </Box>
      <Box component="section" className="landing-content" sx={{ padding: 2 }}>
        <Typography variant="body1">
          Melosofia is a platform dedicated to bringing the best of music and
          philosophy together. Discover insightful articles, engaging
          discussions, and a community of like-minded individuals who share a
          passion for the harmonious blend of melodies and wisdom.
        </Typography>
      </Box>
      <Box
        component="footer"
        className="landing-footer"
        sx={{ textAlign: "center", padding: 2 }}
      >
        <Typography variant="body2">
          &copy; 2023 Melosofia. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default Landing;
