var qs = require("qs");
const { verifyJWTToken } = require("../services/jwtService");
const { getEnvironment } = require("../util/getEnvironment");

const verifyToken = (req, res, next) => {
  if (getEnvironment() === "dev") return next();
  const token = req.headers.authentication;
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = verifyJWTToken(token, process.env.TOKEN_KEY);
    req.user = decoded;
    req.body = qs.parse(req.body);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
