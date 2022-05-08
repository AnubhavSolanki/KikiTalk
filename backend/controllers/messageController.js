const { getPaginatedData } = require("../database/methods/getPaginatedData");
const content = require("../database/models/content");
const message = require("../database/models/messages");
const { printError } = require("../services/coloredPrint");
const { getUserId } = require("../util/getUserId");

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
    ).then(async ({ pageData, hasNext }) => {
      const res = [];
      for (const message of pageData) {
        let messageObj = {
          ...message,
          id: +(message.recieverId !== recieverId),
        };
        if (messageObj.message.startsWith("postId-")) {
          const postId = messageObj.message.split("postId-")[1];
          messageObj = {
            ...messageObj,
            deleted: !(await content.findOne({ _id: postId })),
          };
        }
        res.push(messageObj);
      }
      return { pageData: res, hasNext };
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

const addMessageInDatabase = async (messageDetail) => {
  try {
    const { message, recieverId, senderId } = messageDetail;
    const response = await createMessage({ message, senderId, recieverId });
    return response;
  } catch (err) {
    printError(err);
  }
};

module.exports = {
  getLatestMessages,
  addMessage,
  addMessageInDatabase,
};
