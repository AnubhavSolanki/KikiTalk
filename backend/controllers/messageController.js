const { getPaginatedData } = require("../database/methods/getPaginatedData");
const message = require("../database/models/messages");
const { printError } = require("../services/coloredPrint");
const { getUserId } = require("../util/getUserId");
const { findChannel } = require("./messageChannelController");

const getLatestMessages = async (req, res) => {
  try {
    const { page, size, channelId } = req.query;
    const userId = getUserId(res);
    console.log({ userId });
    if (!(await isUserHaveAccessToChannel(channelId, userId)))
      throw new Error("User don't have access to channel");
    const { pageData, hasNext } = await getPaginatedData(
      message,
      { channelId },
      page,
      size,
      true
    );
    res.status(200).json({ messages: pageData, hasNext });
  } catch (error) {
    printError(error);
    res.status(400).json({ error: error.message });
  }
};

const isUserHaveAccessToChannel = async (channelId, userId) => {
  return findChannel({ channelId, userId });
};

const createMessage = (fields) => {
  return message.create(fields);
};

const addMessage = async (req, res) => {
  try {
    const { message, channelId } = req.body;
    const userId = getUserId(res);
    if (!(await isUserHaveAccessToChannel(channelId, userId)))
      throw new Error("User don't have access to channel");
    const response = await createMessage({ message, channelId, userId });
    res.status(200).json(response);
  } catch (err) {
    printError(error);
    res.status(400).send(error);
  }
};

module.exports = {
  getLatestMessages,
  addMessage,
};
