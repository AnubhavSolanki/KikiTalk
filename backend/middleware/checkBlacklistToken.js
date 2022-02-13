const blackListToken = require("../database/models/blackListToken");
var jwt = require("jsonwebtoken");

const checkBlackListToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(403).send("A token is required");
    }
    jwt.verify(token, process.env.TOKEN_KEY_NEW_PASSWORD);
    const data = await blackListToken.findOne({ token: token });
    if (data) throw new Error("Token is blacklisted");
  } catch (err) {
    return res.status(401).send(err.message);
  }
  return next();
};

module.exports = checkBlackListToken;
