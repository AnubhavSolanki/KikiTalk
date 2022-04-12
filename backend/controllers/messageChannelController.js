const messageChannel = require("../database/models/messageChannel");
const { printError } = require("../services/coloredPrint");
const { findUsers } = require("./userController");
const { getUserId } = require("../util/getUserId");
const { uid } = require("../services/generateUniqueIdService");

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
    const response = await Promise.all(
      (
        await Promise.all(
          (
            await findUsers([userId, friendUserId])
          ).map(async (userDetail) => {
            const channelName = userDetail.full_name.trim();
            const userId = userDetail._id;
            return addChannel({ channelName, userId, channelId }, [
              "channelId",
            ]);
          })
        )
      ).filter((channel) => channel.userId === userId)
    );
    res.status(200).json(response);
  } catch (error) {
    printError(error);
    res.status(400).send(error);
  }
};

module.exports = {
  createMessageChannel,
  findChannel,
};
