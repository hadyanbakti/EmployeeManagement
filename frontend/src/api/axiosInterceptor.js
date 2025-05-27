import { useMemo } from 'react';
import axios from "axios";
import axiosInstance from "./axiosInstance";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useAuth } from "../auth/useAuth";

const useAxiosInterceptor = () => {
  const { auth, setAuth } = useAuth();

  const axiosJWT = useMemo(() => {
    const instance = axios.create({
      baseURL: axiosInstance.defaults.baseURL,
      withCredentials: true,
    });

    instance.interceptors.request.use(
      async (config) => {
        if (!auth || !auth.accessToken) {
          return config;
        }

        try {
          const decoded = jwtDecode(auth.accessToken);
          const isExpired = dayjs.unix(decoded.exp).diff(dayjs()) < 1;

          if (!isExpired) {
            config.headers.Authorization = `Bearer ${auth.accessToken}`;
            return config;
          }

          const res = await axiosInstance.get("/token");
          const newToken = res.data.accessToken;
          setAuth(prev => ({ ...prev, accessToken: newToken }));
          config.headers.Authorization = `Bearer ${newToken}`;
          return config;
        } catch (error) {
          if (error.response?.status === 401) {
            setAuth(null);
          }
          return config;
        }
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          try {
            const res = await axiosInstance.get("/token");
            const newToken = res.data.accessToken;
            setAuth(prev => ({ ...prev, accessToken: newToken }));
            
            // Retry the original request with new token
            const config = error.config;
            config.headers.Authorization = `Bearer ${newToken}`;
            return instance(config);
          } catch (refreshError) {
            setAuth(null);
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, [auth, setAuth]);

  return axiosJWT;
};

export default useAxiosInterceptor;
