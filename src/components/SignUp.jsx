import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import axios from "../api/axios";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

export const SignUp = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const u = USER_REGEX.test(user);
    const p = PWD_REGEX.test(pwd);

    if (!u || !p) {
      setErrMsg("Invalid Entry");
      return;
    }
    localStorage.setItem(
      "reg_user",
      JSON.stringify({
        user,
        pwd,
      })
    );
    // console.log(user, pwd);
    // setSuccess(true);

    try {
      const res = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          user,
          pwd,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return success ? (
    <Typography variant="h2">Success!</Typography>
  ) : (
    <Box>
      {errRef && errMsg && (
        <p ref={errRef} aria-live="assertive">
          {errMsg}
        </p>
      )}
      <Typography variant="h2">SignUp</Typography>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          required
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
        {userFocus && user && !validName && (
          <p id="uidnote">
            4 to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>
        )}

        <label htmlFor="username">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          required
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        {pwdFocus && !validPwd && (
          <p id="pwddnote">
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Allowed special characters:
            <span arial-label="exclamation mark">!</span> .
            <span arial-label="at symbol">@</span> .
            <span arial-label="hashtag">#</span> .
            <span arial-label="dollar sign">$</span> .
          </p>
        )}
        <label htmlFor="confirm_pwd"> Confirm Password:</label>
        <input
          type="password"
          id="confirm_pwd"
          onChange={(e) => setMatchPwd(e.target.value)}
          required
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="confirmnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        {matchFocus && !validMatch && (
          <p id="confirmnote">Must match the password input field </p>
        )}
        <button
          disabled={!validMatch || !validName || !validPwd ? true : false}
        >
          Sign Up
        </button>
      </form>
    </Box>
  );
};
