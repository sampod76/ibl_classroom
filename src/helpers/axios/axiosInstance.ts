/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { configEnv } from "../config/envConfig";
import { authKey } from "@/constants/storageKey";
import { ResponseSuccessType } from "@/types";

// ==============================
// Safe AuthService (Client Only)
// ==============================
class SafeAuthService {
  setToken(key: string, value: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, value);
  }

  getToken(key: string): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(key);
  }

  removeToken(key: string): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  }

  decodeToken<T>(token: string | null): T | null {
    try {
      if (!token) return null;
      return jwtDecode<T>(token);
    } catch {
      return null;
    }
  }
}

// Singleton but only on client
let authService: SafeAuthService | null = null;

function getAuthService() {
  if (typeof window === "undefined") return null;
  if (!authService) authService = new SafeAuthService();
  return authService;
}

// ==============================
// Axios Instance
// ==============================
const instance = axios.create();

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// ==============================
// Request Interceptor
// ==============================
instance.interceptors.request.use(
  (config) => {
    const auth = getAuthService();
    const token = auth?.getToken(authKey);

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ==============================
// Response Interceptor
// ==============================
instance.interceptors.response.use(
  //@ts-ignore
  (response) => {
    return {
      data: response?.data?.data,
      meta: response?.data?.meta,
    } as ResponseSuccessType;
  },

  async (error) => {
    const config = error?.config;

    // Handle 401 (Token Expired)
    if (error?.response?.status === 401 && !config?._retry) {
      config._retry = true;

      try {
        // Refresh token API
        const response = await axios.post(
          `${configEnv.API_BASE_URL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        const newToken = response?.data?.data?.accessToken;

        const auth = getAuthService();
        auth?.setToken(authKey, newToken);

        config.headers["Authorization"] = newToken;

        return instance(config);
      } catch (refreshErr: any) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshErr?.response?.data);
      }
    }

    // Generic error formatting
    const responseObject: any = {
      statusCode: error?.response?.status || 500,
      message: error?.response?.data?.message || "Something went wrong",
      success: false,
      errorMessages: [],
    };

    return Promise.reject(responseObject);
  }
);

export { instance };
