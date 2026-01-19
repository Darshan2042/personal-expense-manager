// Use environment variable in production, fallback to localhost in development
export const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";
