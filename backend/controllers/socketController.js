const { getUserId } = require("../util/getUserId");
const socket = require("../database/models/socket");

const findSocket = (condition) => {
  return socket.findOne(condition);
};

const createSocket = (condition) => {
  return socket.create(condition);
};

const addSocket = async (req, res) => {
  try {
    const userId = await getUserId(res);
    let socketId = await findSocket({ userId });
    if (!socketId) {
      socketId = await createSocket({ userId });
    }
    res.status(200).send({ socketId });
  } catch (error) {
    printError(error);
    res.status(400).json({ error: error.message });
  }
};

const getSocketId = async (req, res) => {
  try {
    const { userId } = req.body;
    let socketId = await findSocket({ userId });
    if (!socketId) {
      socketId = await createSocket({ userId });
    }
    res.status(200).send({ socketId });
  } catch (error) {
    printError(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addSocket,
  getSocketId,
};
