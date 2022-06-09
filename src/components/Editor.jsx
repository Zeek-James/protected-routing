import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const Editor = () => {
  return (
    <section>
      <Typography variant="h1">Editors Page</Typography>
      <Typography variant="h4">
        You must have been assigned an Editor Role
      </Typography>

      <Link to="/home">Home</Link>
    </section>
  );
};
