const { getPaginatedData } = require("../database/methods/getPaginatedData");
const message = require("../database/models/messages");
const { printError } = require("../services/coloredPrint");
const { getUserId } = require("../util/getUserId");
const { findUsers } = require("./userController");

const getLatestMessages = async (req, res) => {
  try {
    const { page, size, senderId } = req.query;
    const recieverId = getUserId(res);
    const { pageData, hasNext } = await getPaginatedData(
      message,
      {
        $or: [
          { senderId, recieverId },
          { recieverId: senderId, senderId: recieverId },
        ],
      },
      page,
      size,
      true
    ).then(({ pageData, hasNext }) => {
      pageData = pageData.map((message) => ({
        ...message,
        id: +(message.recieverId !== recieverId),
      }));
      return { pageData, hasNext };
    });
    res.status(200).json({ messages: pageData, hasNext });
  } catch (error) {
    printError(error);
    res.status(400).json({ error: error.message });
  }
};

const createMessage = (fields) => {
  return message.create(fields);
};

const addMessage = async (req, res) => {
  try {
    const { message, recieverId } = req.body;
    const senderId = getUserId(res);
    const response = await createMessage({ message, senderId, recieverId });
    res.status(200).json(response);
  } catch (err) {
    printError(error);
    res.status(400).send(error);
  }
};

const getListOfFriendsWhoSentMessages = async (req, res) => {
  try {
    const recieverId = getUserId(res);
    const { page, size } = req.query;
    const { pageData, hasNext } = await getPaginatedData(
      message,
      { $or: [{ recieverId }, { senderId: recieverId }] },
      page,
      size,
      true
    ).then(async ({ pageData, hasNext }) => {
      const mem = new Map();
      pageData = await findUsers(
        pageData
          .filter((message) => {
            if (
              !mem.has(`${message.recieverId}-${message.senderId}`) &&
              !mem.has(`${message.senderId}-${message.recieverId}`)
            )
              mem.set(`${message.recieverId}-${message.senderId}`, 1);
            else return false;
            return true;
          })
          .map((message) =>
            message.recieverId === recieverId
              ? message.senderId
              : message.recieverId
          )
      );
      return { pageData, hasNext };
    });
    res.status(200).json({ channelIdList: pageData, hasNext });
  } catch (error) {
    printError(error);
    res.status(400).send(error);
  }
};

module.exports = {
  getLatestMessages,
  addMessage,
  getListOfFriendsWhoSentMessages,
};
