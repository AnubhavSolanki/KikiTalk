const forgotPassword = require("../database/models/forgotPassword");
const { sendMessage } = require("../services/mailService");
const { printError } = require("../services/coloredPrint");
const blackListToken = require("../database/models/blackListToken");
const { findUserAndUpdate, findOneUser } = require("./userController");
const { generateOTP } = require("../services/otpGeneratorService");
const { createToken } = require("../services/jwtService");

const upsertInModel = async (data) => {
  const { userId } = data;
  return await forgotPassword.findOneAndUpdate({ userId: userId }, data, {
    new: true,
    upsert: true,
  });
};

const forgotPasswordMethod = async (req, res) => {
  try {
    const { email } = req.body;
    const data = await findOneUser({ email: email });
    if (!data) throw new Error("Email not found in database");
    const otp = generateOTP();
    await upsertInModel({ userId: data._id, otp });
    await sendMessage({
      to: email,
      subject: "OTP Verification from KikiTalk",
      text: `Your 6 digit OTP for getting new Password is ${otp}.`,
    });
    res.status(200).json({ message: "OTP added to database successfully" });
  } catch (err) {
    printError(err.message);
    res.status(404).json(err.message);
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otp, email } = req.body;
    const data = await findOneUser({ email: email });
    if (!data) throw new Error("Email not found in database");
    const response = await forgotPassword.findOne({
      userId: data._id,
    });
    if (parseInt(otp) !== response.otp) throw new Error("OTP not matched");
    const token = createToken({}, process.env.TOKEN_KEY_NEW_PASSWORD);
    res.status(200).json({ message: "OTP Verified Successfully", token });
  } catch (err) {
    printError(err.message);
    res.status(404).json(err.message);
  }
};

const saveNewPassword = async (req, res) => {
  try {
    const { token, password, email } = req.body;
    await findUserAndUpdate({ email }, { password });
    await blackListToken.create({ token: token });
    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    printError(err.message);
    res.status(404).json(err.message);
  }
};

module.exports = {
  forgotPasswordMethod,
  verifyOtp,
  saveNewPassword,
};
