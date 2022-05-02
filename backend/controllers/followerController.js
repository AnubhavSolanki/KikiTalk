const { getPaginatedData } = require("../database/methods/getPaginatedData");
const follower = require("../database/models/follower");
const user = require("../database/models/user");
const { printError } = require("../services/coloredPrint");
const { getUserId } = require("../util/getUserId");
const { addNotifications } = require("./notifications.controller");

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
    const followerDetail = await user.findOne({ _id: req.body.followerId });
    const notificationText = `${followerDetail.full_name} has ${
      isFollower ? "followed" : "unfollowed"
    } you`;
    await addNotifications(notificationText, req.body.userId);
    res.json({ message: "Follower toggled successfully", isFollower });
  } catch (error) {
    printError(error);
    res.status(400).send(error.message);
  }
};

const getMyFollowersCount = async (userId) => {
  return new Promise((resolve, reject) => {
    follower.countDocuments({ userId }, (error, count) => {
      if (error) reject(error);
      resolve(count);
    });
  });
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

const getFollowers = async (req, res) => {
  try {
    const myId = getUserId(res);
    const { page, size, userId, isForSend } = req.query;
    const { pageData, hasNext } = await getPaginatedData(
      follower,
      { userId },
      page,
      size,
      true
    ).then(async ({ pageData, hasNext }) => {
      const response = [];
      for (const data of pageData) {
        const userData = await user.findOne({ _id: data.followerId });
        const follow = !!(await findMyFollower({
          _id: data.followerId,
          followerId: myId,
        }));
        response.push({
          ...data,
          userData,
          buttonText: !!isForSend ? "Send" : follow ? "Unfollow" : "Follow",
        });
      }
      return { pageData: response, hasNext };
    });
    res.status(200).json({ pageData, hasNext });
  } catch (error) {
    printError(error);
    res.status(400).send(error.message);
  }
};

const getFollowings = async (req, res) => {
  try {
    const myId = getUserId(res);
    const { page, size, userId } = req.query;
    const { pageData, hasNext } = await getPaginatedData(
      follower,
      { followerId: userId },
      page,
      size,
      true
    ).then(async ({ pageData, hasNext }) => {
      const response = [];
      for (const data of pageData) {
        const userData = await user.findOne({ _id: data.userId });
        const follow = !!(await findMyFollower({
          _id: data.userId,
          followerId: myId,
        }));
        response.push({
          ...data,
          userData,
          buttonText: follow ? "Unfollow" : "Follow",
        });
      }
      return { pageData: response, hasNext };
    });
    res.status(200).json({ pageData, hasNext });
  } catch (error) {
    printError(error);
    res.status(400).send(error.message);
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
  getFollowers,
  getFollowings,
  findMyFollower,
};
