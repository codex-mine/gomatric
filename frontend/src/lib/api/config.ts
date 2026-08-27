export const API_CONFIG = {
  baseUrl:
    process.env.NEXT_PUBLIC_API_URL ||
    (typeof window !== "undefined" ? "/api/v1" : "http://localhost:5000/api/v1"),
  timeout: 10000,
};
