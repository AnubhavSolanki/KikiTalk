const { getPaginatedData } = require("../database/methods/getPaginatedData");
const notification = require("../database/models/notifications");
const { printError } = require("../services/coloredPrint");

const getNotifications = async (req, res) => {
  try {
    const { id, page, size } = req.query;
    const { pageData, hasNext } = await getPaginatedData(
      notification,
      { userId: id },
      page,
      size,
      true
    );
    res.status(200).json({ posts: pageData, hasNext });
  } catch (error) {
    printError(error);
    res.status(400).send(error);
  }
};

module.exports = {
  getNotifications,
};
