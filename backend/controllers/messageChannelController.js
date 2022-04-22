const { getPaginatedData } = require("../database/methods/getPaginatedData");
const messageChannel = require("../database/models/messageChannel");
const { printError } = require("../services/coloredPrint");
const { getUserId } = require("../util/getUserId");

const findDeleteAndCreateNew = (condition) => {
  messageChannel.findOneAndDelete(condition);
  messageChannel.create(condition);
};

const addMessageChannelInDatabase = (friendId, myId) => {
  try {
    findDeleteAndCreateNew({ userId: myId, friendId });
    findDeleteAndCreateNew({ userId: friendId, friendId: myId });
  } catch (err) {
    printError(err);
  }
};

const getMessageChannels = async (req, res) => {
  try {
    const recieverId = getUserId(res);
    const { page, size } = req.query;
    const { pageData, hasNext } = await getPaginatedData(
      messageChannel,
      { userId: recieverId },
      page,
      size,
      true
    );
    res.status(200).json({ channelIdList: pageData, hasNext });
  } catch (err) {}
};

module.exports = {
  addMessageChannelInDatabase,
  getMessageChannels,
};
