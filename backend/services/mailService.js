const sgMail = require("@sendgrid/mail");

const sendMessage = async (msg) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    msg["from"] = "geurecruitanubhavsolanki@gmail.com";
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};

module.exports = {
  sendMessage,
};
