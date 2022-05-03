const comment = require("../database/models/comment");
const { printError } = require("../services/coloredPrint");
const { getPaginatedData } = require("../database/methods/getPaginatedData");
const { findOneUser } = require("./userController");

const addComment = async (req, res) => {
  try {
    let response = await comment.create(req.body);
    const { userId } = response;
    const userData = await findOneUser({ _id: userId });
    response._doc["profileImage"] = userData?.image;
    response._doc["profileName"] = userData.full_name;
    res.status(200).json(response);
  } catch (error) {
    printError(error);
    res.status(400).send(error.message);
  }
};

const getComments = async (req, res) => {
  try {
    const { postId, page, size } = req.query;
    const { pageData, hasNext } = await getPaginatedData(
      comment,
      { postId },
      page,
      size,
      true
    ).then(async ({ pageData, hasNext }) => {
      await Promise.all(
        pageData.map(async (record) => {
          const { userId } = record;
          const userData = await findOneUser({ _id: userId });
          record["profileImage"] = userData?.profileImageUrl;
          record["profileName"] = userData.full_name;
          return record;
        })
      );
      return { pageData, hasNext };
    });
    res.status(200).json({ comments: pageData, hasNext });
  } catch (error) {
    printError(error);
    res.status(400).send(error.message);
  }
};

module.exports = {
  addComment,
  getComments,
};
