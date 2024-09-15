const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header is missing" });
  }

  const tokenParts = authHeader.split(" ");
  
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ error: "Authorization header is malformed" });
  }

  const token = tokenParts[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      const message = err.name === 'TokenExpiredError' ? "Token expired" : "Token is invalid";
      return res.status(403).json({ error: message });
    }

    try {
      req.user = user;
    } catch (innerErr) {
      console.error(innerErr);
      return res.status(500).json({ error: "An error occurred while processing the user data" });
    }
    
    next();
  });
};

module.exports = authenticateToken;