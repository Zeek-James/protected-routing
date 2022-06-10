import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Users } from "./Users";

export const Admin = () => {
  return (
    <section>
      <Typography variant="h1">Admin Page</Typography>
      <Typography variant="h4">You must have been assigned an Admin</Typography>
      <Users />
      <Link to="/home">Home</Link>
    </section>
  );
};
