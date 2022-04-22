const follower = require("../database/models/follower");
const { printError } = require("../services/coloredPrint");

const findMyFollower = async (condition) => {
  try {
    return await follower.find(condition);
  } catch (error) {
    printError(error);
  }
};

const findAndDelete = async (condition) => {
  try {
    await follower.findOneAndDelete(condition);
  } catch (error) {
    printError(error);
  }
};

const toggleFollower = async (req, res) => {
  try {
    let isFollower = false;
    if ((await findMyFollower(req.body)).length) {
      await findAndDelete(req.body);
    } else {
      isFollower = true;
      await follower.create(req.body);
    }
    res.json({ message: "Follower toggled successfully", isFollower });
  } catch (error) {
    printError(error);
    res.status(400).send(error.message);
  }
};

const getMyFollowersCount = async (userId) => {
  try {
    return new Promise((resolve, reject) => {
      follower.countDocuments({ userId }, (error, count) => {
        if (error) reject(error);
        resolve(count);
      });
    });
  } catch (error) {
    printError(error);
  }
};

const getMyFollowingsCount = async (userId) => {
  try {
    return new Promise((resolve, reject) => {
      follower.countDocuments({ followerId: userId }, (error, count) => {
        if (error) reject(error);
        resolve(count);
      });
    });
  } catch (error) {
    printError(error);
  }
};

const haveUserFollowed = async (userId, followerId) => {
  try {
    return await follower.find({ userId, followerId });
  } catch (error) {
    printError(error);
  }
};

module.exports = {
  toggleFollower,
  getMyFollowersCount,
  getMyFollowingsCount,
  haveUserFollowed,
};
