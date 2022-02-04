const comment = require("../database/models/comment");
const { printError } = require("../services/coloredPrint");

const addComment = async (req, res) => {
  try {
    await comment.create(req.body);
    res.status(200).send("Comment Succesfully Added");
  } catch (error) {
    printError(error);
    res.status(400).send(error.message);
  }
};

module.exports = {
  addComment,
};
