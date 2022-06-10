import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const LOGIN_URL = "/auth";

export const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(LOGIN_URL, JSON.stringify({ user, pwd }), {
        headers: { "content-Type": "application/json" },
        withCredentials: true,
      });

      const accessToken = res?.data?.accessToken;
      const roles = res?.data?.roles;
      setAuth({
        user,
        pwd,
        roles,
        accessToken,
      });
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Username or Password is Wrong");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      // errRef.current.focus();
    }
  };

  return (
    <Box>
      {errRef && errMsg && (
        <p ref={errRef} aria-live="assertive">
          {errMsg}
        </p>
      )}
      <Typography variant="h2">Login</Typography>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          required
        />

        <label htmlFor="username">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          required
        />
        <button>Login</button>
      </form>
    </Box>
  );
};
