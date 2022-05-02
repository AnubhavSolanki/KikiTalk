const { getPagination } = require("../database/methods/getPaginatedData");
const content = require("../database/models/content");
const follower = require("../database/models/follower");
const user = require("../database/models/user");
const { printError } = require("../services/coloredPrint");
const { createFuzzySearcher } = require("../services/fuzzySearchService");
const { uploadImage } = require("../services/imgbbService");
const { getUserId } = require("../util/getUserId");

const addUser = async (userData) => {
  return await user.create(userData);
};

const findOneUser = (condition) => {
  return user.findOne(condition);
};

const findUsers = async (listOfUserId) => {
  return await Promise.all(listOfUserId.map((id) => findOneUser({ _id: id })));
};

const findUserAndUpdate = async (condition, update) => {
  return await user.findOneAndUpdate(condition, update, { new: true });
};

const getAllUsers = async () => {
  return await user.find().lean();
};

const searchUserController = async (req, res) => {
  try {
    const { searchText, page, size } = req.query;
    const fuzzySearchKeys = ["full_name"];
    const hayStackfields = ["full_name", "profileImageUrl", "_id", "username"];
    const users = await getAllUsers();
    const userId = getUserId(res);
    const userSearcher = await createFuzzySearcher(
      fuzzySearchKeys,
      hayStackfields,
      users
    );
    let response = await userSearcher.search(searchText);
    const { limit, offset } = getPagination(page, size);
    const hasNext = response.length > offset + limit;
    res.status(200).json({
      hasNext,
      searchResult: response
        .filter((data) => data._id != userId)
        .slice(offset, offset + limit),
    });
  } catch (err) {
    printError(err.message);
    res.status(404).json(err.message);
  }
};

const getProfileDetail = async (req, res) => {
  try {
    const { userId } = req.query;
    const myID = getUserId(res);
    const followers = await new Promise((resolve, reject) => {
      follower.countDocuments({ userId }, (error, count) => {
        if (error) reject(error);
        resolve(count);
      });
    });
    const following = await new Promise((resolve, reject) => {
      follower.countDocuments({ followerId: userId }, (error, count) => {
        if (error) reject(error);
        resolve(count);
      });
    });
    const postCount = await content.countDocuments({ userId });
    const userDetail = await findOneUser({ _id: userId });
    res.status(200).json({
      id: userId,
      imgUrl: userDetail?.profileImageUrl ?? null,
      name: userDetail?.full_name,
      postCount,
      follower: followers,
      following,
      isMyProfile: myID === userId,
      isFollowed: !!(await follower.find({ userId, followerId: myID })).length,
    });
  } catch (error) {
    printError(error.message);
    res.status(404).json(error.message);
  }
};

const updateProfileName = async (req, res) => {
  try {
    const { full_name } = req.body;
    const myID = getUserId(res);
    const response = await findUserAndUpdate({ _id: myID }, { full_name });
    res.status(200).json({ name: response.full_name });
  } catch (error) {
    printError(error.message);
    res.status(404).json(error.message);
  }
};

const updateProfileImage = async (req, res) => {
  try {
    const { base64 } = req.body;
    const userId = getUserId(res);
    const profileImageUrl = (await uploadImage(base64)).url;
    const response = await findUserAndUpdate(
      { _id: userId },
      { profileImageUrl }
    );
    res.status(200).json({ imgUrl: response.profileImageUrl });
  } catch (error) {
    printError(error.message);
    res.status(404).json(error.message);
  }
};

module.exports = {
  addUser,
  findOneUser,
  findUserAndUpdate,
  getAllUsers,
  searchUserController,
  findUsers,
  getProfileDetail,
  updateProfileName,
  updateProfileImage,
};
