import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useLogout } from "../hooks/useLogout";

export const Home = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/");
  };
  return (
    <section>
      <Typography variant="h1">Home Page</Typography>
      <Typography variant="body1">You are logged in!</Typography>
      <br />
      <Link to="/editor">Go to the Editor page</Link>
      <br />
      <Link to="/admin">Go to the Admin page</Link>
      <br />
      <Link to="/lounge">Go to the Lounge</Link>
      <br />
      <Box className="flexGrow">
        <Button onClick={signOut}>Sign Out</Button>
      </Box>
    </section>
  );
};
