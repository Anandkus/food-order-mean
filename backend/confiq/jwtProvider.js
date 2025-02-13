const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;

const generateToken = (userId) => {
  const payload = { userId }; // Add any other data you want to include in the token
  const options = { expiresIn: '1h' }; // Token expires in 1 hour
  return jwt.sign(payload, SECRET_KEY, options);
}

const verifyToken = async (token) => {
  try {
    const decodeToken = jwt.verify(token, SECRET_KEY);
    return decodeToken.userId;
  } catch (error) {
    return null
  }
}

module.exports = { generateToken, verifyToken };