import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const Lounge = () => {
  return (
    <section>
      <Typography variant="h1">The Lounge</Typography>
      <br />
      <Typography>Admins and Editors can hang out here.</Typography>
      <Box className="flexGrow">
        <Link to="/home">Home</Link>
      </Box>
    </section>
  );
};
