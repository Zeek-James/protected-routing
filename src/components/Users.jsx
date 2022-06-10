import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import axios from "../api/axios";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {});
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getUsers();
    return () => {
      isMounted = false;
      controller.abort();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <article>
      <Typography variant="h2">Users List</Typography>
      {users?.length ? (
        <Box>
          {users.map((user, i) => (
            <Box key={i}>
              <Typography variant="h4">
                ({i + 1}) {user?.username}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography variant="body1">No users to display</Typography>
      )}
    </article>
  );
};
