import { Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  return (
    <div>
      <Typography variant="h2">Unauthorized</Typography>
      <Typography variant="body1">
        You do not have access to the requested page.
      </Typography>
      <Button onClick={goBack}>Go Back</Button>
    </div>
  );
};
