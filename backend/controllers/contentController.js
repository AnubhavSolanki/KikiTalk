const { getCount } = require("../database/methods/getCount");
const content = require("../database/models/content");
const user = require("../database/models/user");
const { printError } = require("../services/coloredPrint");

const addContent = async (req, res) => {
  try {
    await content.create(req.body);
    res.status(200).send("Content Succesfully Added");
  } catch (error) {
    printError(error);
    res.status(400).send(error.message);
  }
};

const addLikes = async (req, res) => {
  try {
    const { postId, userId } = req.body;
    const response = await content.findOneAndUpdate(
      { _id: postId },
      { $addToSet: { likedBy: userId } },
      {
        new: true,
      }
    );
    res
      .status(200)
      .json({ message: "Like Successfully Added", data: response });
  } catch (err) {
    printError(error);
    res.status(400).send(error.message);
  }
};

const removeLikes = async (req, res) => {
  try {
    const { postId, userId } = req.body;
    const response = await content.findOneAndUpdate(
      { _id: postId },
      { $pull: { likedBy: userId } },
      {
        new: true,
      }
    );
    res
      .status(200)
      .json({ message: "Like Successfully Removed", data: response });
  } catch (err) {
    printError(error);
    res.status(400).send(error.message);
  }
};

const getLatestPost = async (req, res) => {
  try {
    let hasNext = true,
      from = req.query.from,
      to = req.query.to,
      pageCount = from - to;
    const contentCount = await getCount(content);

    if (contentCount <= from) {
      res.status(200).json({ posts: [], hasNext: false });
    } else if (contentCount - to < 0) {
      to = from;
      pageCount = contentCount - from;
      hasNext = false;
    } else if (contentCount - to === 0) {
      hasNext = false;
    }

    let response = await content
      .find()
      .skip(contentCount - to)
      .limit(pageCount);

    response = await Promise.all(
      response.map(async (record) => {
        const { userId } = record;
        const userData = await user.findOne({ _id: userId });
        record._doc["profileImage"] = userData?.image ?? "";
        record._doc["profileName"] = userData.full_name ?? "";
        return record;
      })
    );
    res.status(200).json({ posts: response, hasNext: hasNext });
  } catch (error) {
    printError(error);
    res.status(400).send(error.message);
  }
};

module.exports = {
  addContent,
  getLatestPost,
  addLikes,
  removeLikes,
};
