// Use environment variable in production, fallback to localhost in development
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

module.exports = CLIENT_URL;