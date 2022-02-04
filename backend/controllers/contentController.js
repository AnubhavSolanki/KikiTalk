const content = require("../database/models/content");
const { printError } = require("../services/coloredPrint");

const addContent = async (req, res) => {
  try {
    await content.create(req.body);
    res.status(200).send("Content Succesfully Added");
  } catch (error) {
    printError(error);
    res.status(400).send(error.message);
  }
};

module.exports = {
  addContent,
};
