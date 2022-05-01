const { printError, printSuccess } = require("../services/coloredPrint");
const { createToken } = require("../services/jwtService");
const { getUserId } = require("../util/getUserId");
const { addUser, findOneUser, findUserAndUpdate } = require("./userController");

const loginWithToken = async (req, res) => {
  try {
    const userId = getUserId(res);
    const userDetail = await findOneUser({ _id: userId });
    if (!userDetail) throw Error("Invalid Token");
    res.status(200).json(userDetail);
  } catch (error) {
    printError(error.message);
    res.status(404).json({ message: error.message });
  }
};

const verifyLoginDetails = async (email, password) => {
  try {
    const userDetail = await findOneUser({ email: email });
    if (!userDetail) throw Error("Email not exists");
    var originalPassword = userDetail.password;
    if (originalPassword != password) {
      throw new Error("Wrong Password");
    }
    const token = createToken({ id: userDetail.id }, process.env.TOKEN_KEY);
    return await findUserAndUpdate({ email }, { token });
  } catch (error) {
    throw error;
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
    const userDetail = await addUser(req.body);
    const token = createToken({ id: userDetail.id }, process.env.TOKEN_KEY);
    printSuccess("Successfully Registered");
    res.status(200).json({ ...userDetail._doc, token });
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
