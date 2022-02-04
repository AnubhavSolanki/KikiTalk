var jwt = require("jsonwebtoken");
const user = require("../database/models/user");
const { printError, printSuccess } = require("../services/coloredPrint");

const updateToken = async (token, email) => {
  return await user.findOneAndUpdate(
    { email: email },
    { token: token },
    { new: true }
  );
};

const verifyLoginDetails = async (email, password) => {
  try {
    const userDetail = await user.findOne({ email: email }).exec();
    if (!userDetail) throw Error("Email not exists");
    var originalPassword = userDetail.password;
    if (originalPassword != password) {
      throw new Error("Wrong Password");
    }
    const token = jwt.sign({ email }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });
    return await updateToken(token, email);
  } catch (error) {
    throw error;
  }
};

const loginWithToken = async (req, res) => {
  try {
    const { token } = req.body;
    const userDetail = await user.findOne({ token: token }).exec();
    if (!userDetail) throw Error("Invalid Token");
    res.status(200).json(userDetail);
  } catch (error) {
    printError(error.message);
    res.status(404).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const data = await verifyLoginDetails(req.body.email, req.body.password);
    printSuccess("Logged In Successfully");
    res.status(200).json(data);
  } catch (error) {
    printError(error.message);
    res.status(404).json({ message: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { email } = req.body;
    const token = jwt.sign({ email }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });
    req.body.token = token;
    const userDetail = await user.create(req.body);
    printSuccess("Successfully Registered");
    res.status(200).json(userDetail);
  } catch (error) {
    printError(error.message);
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  login,
  register,
  loginWithToken,
};
