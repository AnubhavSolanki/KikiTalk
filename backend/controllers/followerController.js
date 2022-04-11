const follower = require("../database/models/follower");

const addFollower = async (req, res) => {
  try {
    await follower.create(req.body);
    res.json({ message: "Follower added successfully" });
  } catch (err) {
    printError(error);
    res.status(400).send(error.message);
  }
};

module.exports = {
  addFollower,
};
