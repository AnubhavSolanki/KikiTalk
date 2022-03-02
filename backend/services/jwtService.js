var jwt = require("jsonwebtoken");

const createToken = (data, secretKey, expirationTime = "2h") => {
  try {
    return jwt.sign(data, secretKey, {
      expiresIn: expirationTime,
    });
  } catch (err) {
    throw new Error("Error while creating token");
  }
};

const verifyJWTToken = (token, secretKey) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    throw new Error("Invalid Token");
  }
};

module.exports = {
  createToken,
  verifyJWTToken,
};
