const { getPaginatedData } = require("../database/methods/getPaginatedData");
const content = require("../database/models/content");
const user = require("../database/models/user");
const { printError } = require("../services/coloredPrint");
const { uploadImage } = require("../services/imgbbService");

const addContent = async (req, res) => {
  try {
    const { base64, userId } = req.body;
    const userData = await user.findOne({ _id: userId });
    if (!userData) throw new Error("User not exists");
    req.body = {
      ...req.body,
      data: await uploadImage(base64),
      contentType: "image",
    };
    const response = await content.create(req.body);
    response["profileImage"] = userData?.image;
    response["profileName"] = userData.full_name;
    res.status(200).json(response);
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
    const { page, size } = req.query;
    const { pageData, hasNext } = await getPaginatedData(
      content,
      {},
      page,
      size,
      true
    ).then(async ({ pageData, hasNext }) => {
      await Promise.all(
        pageData.map(async (record) => {
          const { userId } = record;
          const userData = await user.findOne({ _id: userId });
          record["profileImage"] = userData?.image;
          record["profileName"] = userData.full_name;
          return record;
        })
      );
      return { pageData, hasNext };
    });
    await res.status(200).json({ posts: pageData, hasNext });
  } catch (error) {
    printError(error);
    res.status(400).send(error);
  }
};

module.exports = {
  addContent,
  getLatestPost,
  addLikes,
  removeLikes,
};
