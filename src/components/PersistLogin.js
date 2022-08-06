import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useRefreshToken } from "../hooks/useRefreshToken";

export const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { auth } = useAuth();
  const [persist] = useLocalStorage("persist", false);
  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`at: ${JSON.stringify(auth?.accessToken)}`);
    // eslint-disable-next-line
  }, [isLoading]);

  return !persist ? (
    <Outlet />
  ) : isLoading ? (
    <Typography variant="h4">Loading...</Typography>
  ) : (
    <Outlet />
  );
};
