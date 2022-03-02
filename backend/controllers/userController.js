const { getPagination } = require("../database/methods/getPaginatedData");
const user = require("../database/models/user");
const { printError } = require("../services/coloredPrint");
const { createFuzzySearcher } = require("../services/fuzzySearchService");
const addUser = async (userData) => {
  return await user.create(userData);
};

const findOneUser = async (condition) => {
  return await user.findOne(condition);
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
      searchResult: response.slice(offset, offset + limit),
    });
  } catch (err) {
    printError(err.message);
    res.status(404).json(err.message);
  }
};

module.exports = {
  addUser,
  findOneUser,
  findUserAndUpdate,
  getAllUsers,
  searchUserController,
};
