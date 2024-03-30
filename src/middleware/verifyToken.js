const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the token is expired
    if (decoded.exp < Date.now() / 1000) {
      // Token is expired, refresh token
      const newToken = generateNewToken(decoded.userId);

      // Set the new token in the response header
      res.set("Authorization", newToken);

      // Update req.userId with the user ID from the refreshed token
      req.userId = decoded.userId;
    } else {
      // Token is valid, set req.userId with the user ID from the token
      req.userId = decoded.userId;
    }

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

function generateNewToken(userId) {
  // Generate a new JWT token with the same user ID
  const newToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
  return newToken;
}

module.exports = verifyToken;
