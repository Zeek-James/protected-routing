import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";
import { useRefreshToken } from "./useRefreshToken";

export const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const reqIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }

        return config;
      },
      (err) => Promise.reject(err)
    );
    const resIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (err) => {
        const prevReq = err?.config;
        if (err?.response?.status === 403 && !prevReq?.sent) {
          prevReq.sent = true;
          const newAccessToken = await refresh();
          prevReq.headers["Authoriztion"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevReq);
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(reqIntercept);
      axiosPrivate.interceptors.response.eject(resIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};
