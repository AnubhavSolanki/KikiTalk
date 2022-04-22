const { verifyJWTToken, decodeToken } = require("../services/jwtService");
const { getEnvironment } = require("../util/getEnvironment");

const verifyToken = (req, res, next) => {
  if (getEnvironment() === "dev") {
    res.user = decodeToken(req.headers.authentication, process.env.TOKEN_KEY);
    console.log({ user: res.user });
    return next();
  }
  const token = req.headers.authentication;
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = verifyJWTToken(token, process.env.TOKEN_KEY);
    res.user = decoded;
    console.log({ res });
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

const verifySocketRequest = (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    if (getEnvironment() === "dev") {
      socket.user = decodeToken(token, process.env.TOKEN_KEY);
      console.log("scoket user", socket.user);
      return next();
    }
    if (!token) {
      next(new Error("Token not found"));
    }
    const decoded = verifyJWTToken(token, process.env.TOKEN_KEY);
    socket.user = decoded;
  } catch (err) {
    console.log(err);
    next(err);
  }
  next();
};

module.exports = { verifyToken, verifySocketRequest };
