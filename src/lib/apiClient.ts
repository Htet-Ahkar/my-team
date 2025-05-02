import axios from "redaxios";

const baseURL = "https://api.balldontlie.io";

export const apiClient = axios.create({
  baseURL,
  headers: {
    // Next.js environment variables must use the NEXT_PUBLIC_ prefix for client-side access
    Authorization: process.env.NEXT_PUBLIC_API_KEY || "",
  },
});
