const jwt = require("jsonwebtoken");

// Secret keys (use environment variables in production)
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_KEY;

// Access token expiration: 15 minutes
const ACCESS_TOKEN_EXPIRY = "6d";

// Refresh token expiration: 7 days
const REFRESH_TOKEN_EXPIRY = "7d";

// Generate Access Token
function generateAccessToken(user) {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Generate Refresh Token
function generateRefreshToken(user) {
  return jwt.sign(
    { userId: user._id, email: user.email },
    REFRESH_TOKEN_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRY } // Token expires in 7 days
  );
}

module.exports = { generateAccessToken, generateRefreshToken };
