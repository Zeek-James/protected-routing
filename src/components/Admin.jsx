import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const Admin = () => {
  return (
    <section>
      <Typography variant="h1">Admin Page</Typography>
      <Typography variant="h4">You must have been assigned an Admin</Typography>

      <Link to="/home">Home</Link>
    </section>
  );
};
