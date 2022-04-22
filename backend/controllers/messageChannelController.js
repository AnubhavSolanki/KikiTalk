const { getPaginatedData } = require("../database/methods/getPaginatedData");
const messageChannel = require("../database/models/messageChannel");
const { printError } = require("../services/coloredPrint");
const { getUserId } = require("../util/getUserId");
const { findUsers } = require("./userController");

const findDeleteAndCreateNew = async (condition) => {
  await messageChannel.findOneAndDelete(condition);
  await messageChannel.create(condition);
};

const addMessageChannelInDatabase = async (friendId, myId) => {
  try {
    await findDeleteAndCreateNew({ userId: myId, friendId });
    await findDeleteAndCreateNew({ userId: friendId, friendId: myId });
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
    ).then(async ({ pageData, hasNext }) => {
      pageData = await findUsers(pageData.map((data) => data.friendId));
      return { pageData, hasNext };
    });
    res.status(200).json({ channelIdList: pageData, hasNext });
  } catch (err) {}
};

module.exports = {
  addMessageChannelInDatabase,
  getMessageChannels,
};
