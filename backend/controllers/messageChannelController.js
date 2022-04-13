const messageChannel = require("../database/models/messageChannel");
const { printError } = require("../services/coloredPrint");
const { findUsers } = require("./userController");
const { getUserId } = require("../util/getUserId");
const { uid } = require("../services/generateUniqueIdService");
const { getPaginatedData } = require("../database/methods/getPaginatedData");

const findChannel = (condition) => {
  return messageChannel.findOne(condition);
};

const addChannel = async (fields, omitFieldsFromCondition = []) => {
  const condition = Object.keys(fields).reduce((acc, field) => {
    if (!omitFieldsFromCondition.includes(field)) {
      acc[field] = fields[acc];
    }
    return acc;
  }, {});
  const channel = await findChannel(condition);
  if (channel) return channel;
  return messageChannel.create(fields);
};

const createMessageChannel = async (req, res) => {
  try {
    const { friendUserId } = req.body;
    const userId = getUserId(res);
    const channelId = uid();
    const promiseArray = [];
    const userDetail = await findUsers([userId, friendUserId]);
    for (const detail of userDetail) {
      for (const friendDetail of userDetail) {
        const channelName = friendDetail.full_name.trim();
        const userId = detail._id;
        if (detail === friendDetail) continue;
        promiseArray.push(addChannel({ channelName, userId, channelId }));
      }
    }
    const response = (await Promise.all(promiseArray)).filter(
      (channel) => channel.userId === userId
    );
    res.status(200).json(response);
  } catch (error) {
    printError(error);
    res.status(400).send(error);
  }
};

const getListOfChannelId = async (req, res) => {
  try {
    const { page, size } = req.query;
    const userId = getUserId(res);
    const { pageData, hasNext } = await getPaginatedData(
      messageChannel,
      { userId },
      page,
      size,
      true,
      true
    );
    res.status(200).json({ channelIdList: pageData, hasNext });
  } catch (error) {
    printError(error);
    res.status(400).send(error);
  }
};

module.exports = {
  createMessageChannel,
  findChannel,
  getListOfChannelId,
};
