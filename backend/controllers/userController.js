const { getPagination } = require("../database/methods/getPaginatedData");
const content = require("../database/models/content");
const user = require("../database/models/user");
const { printError } = require("../services/coloredPrint");
const { createFuzzySearcher } = require("../services/fuzzySearchService");
const { getUserId } = require("../util/getUserId");
const {
  getMyFollowersCount,
  getMyFollowingsCount,
  haveUserFollowed,
} = require("./followerController");

const addUser = async (userData) => {
  return await user.create(userData);
};

const findOneUser = async (condition) => {
  return await user.findOne(condition);
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
    const follower = await getMyFollowersCount(userId);
    const following = await getMyFollowingsCount(userId);
    console.log({ follower, following });
    const postCount = await content.countDocuments({ userId });
    const userDetail = await findOneUser({ _id: userId });
    res.status(200).json({
      id: userId,
      imgUrl: userDetail?.profileImageUrl ?? null,
      name: userDetail?.full_name,
      postCount,
      follower,
      following,
      isMyProfile: myID === userId,
      isFollowed: !!(await haveUserFollowed(userId, myID)),
    });
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
};
