const jwtProvider = require("../confiq/jwtProvider");
const userModel = require('../models/user');

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(404).send({ message: "token not found" });
    }
    const userId = await jwtProvider.verifyToken(token);
    if (!userId) {
      return res.status(404).send({ message: "User ID not found in token" });
    }
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "user not found !" })
    }
    req.user = user;
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
  next();
}

module.exports = authenticate;