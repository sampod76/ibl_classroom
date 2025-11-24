import { authKey } from "@/constants/storageKey";
import { instance } from "@/helpers/axios/axiosInstance";
import { configEnv } from "@/helpers/config/envConfig";
import { jwtDecode } from "jwt-decode";

export class AuthService {
  // ========================
  // LocalStorage Functions
  // ========================
  setToken(key: string, value: string): void {
    if (typeof window === "undefined" || !key) return;
    localStorage.setItem(key, value);
  }

  getToken(key: string): string | null {
    if (typeof window === "undefined" || !key) return null;
    return localStorage.getItem(key);
  }

  removeToken(key: string): void {
    if (typeof window === "undefined" || !key) return;
    localStorage.removeItem(key);
  }

  // ========================
  // Decode Token
  // ========================
  decodeToken<T>(token: string | null): T | null {
    try {
      if (!token) return null;
      return jwtDecode<T>(token);
    } catch (error) {
      console.error("JWT decode error:", error);
      return null;
    }
  }

  // ========================
  // Get Access Token (Shortcut)
  // ========================
  getAccessToken(): string | null {
    return this.getToken(authKey);
  }

  getDecodedUser<T>(): T | null {
    const token = this.getAccessToken();
    return this.decodeToken<T>(token);
  }
  setTokenAndDecodeUser<T>(token: string): T | null {
    this.setToken(authKey, token);
    return this.decodeToken<T>(token);
  }

  // ========================
  // Refresh Token API
  // ========================
  async refreshToken() {
    try {
      const response = await instance({
        url: `${configEnv.API_BASE_URL}/auth/refresh-token`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      console.error("Refresh token failed:", error);
      throw error;
    }
  }

  // ========================
  // LOGOUT (Clear Token + Reload)
  // ========================
  logout() {
    if (typeof window === "undefined") return;

    // Remove only auth token
    // this.removeToken(authKey);

    // Optionally clear all auth-related data
    localStorage.clear();

    // Redirect to login
    window.location.href = "/login";
  }
}
