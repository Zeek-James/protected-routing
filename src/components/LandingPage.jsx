import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <section>
      <Typography variant="h1">Landing Page</Typography>
      <Typography variant="h4">You must have been assigned an Admin</Typography>
      <Box>
        <Link to="/login">Login</Link>
        <Link to="/register">Sign Up</Link>
      </Box>
    </section>
  );
};
