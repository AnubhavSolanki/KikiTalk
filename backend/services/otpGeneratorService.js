const otpGenerator = require("otp-generator");

const generateOTP = (
  length = 6,
  options = {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  }
) => {
  return otpGenerator.generate(length, options);
};

module.exports = {
  generateOTP,
};
