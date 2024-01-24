/**
 * @author hieubt
 * @email [hieubt2@msb.com.vn]
 * @create date 18/01/2024
 * @modify date 18/01/2024
 * @desc [description]
 */

import axios, { InternalAxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  timeout: Number(import.meta.env.VITE_API_TIME_OUT) || 1000,
});
instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken = getLocalAccessToken();
});
