const { getPaginatedData } = require("../database/methods/getPaginatedData");
const content = require("../database/models/content");
const { printError } = require("../services/coloredPrint");
const { uploadImage } = require("../services/imgbbService");
const { getUserId } = require("../util/getUserId");
const { findOneUser } = require("./userController");

const addContent = async (req, res) => {
  try {
    const { base64, description } = req.body;
    const userId = getUserId(res);
    const userData = await findOneUser({ _id: userId });
    if (!userData) throw new Error("User not exists");
    req.body = {
      ...req.body,
      data: await uploadImage(base64),
      contentType: "image",
    };
    const response = await content.create({ ...req.body, userId });
    response._doc["profileImage"] = userData?.image;
    response._doc["profileName"] = userData.full_name;
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    printError(error);
    res.status(400).send(error.message);
  }
};

const getPostWithId = async (req, res) => {
  try {
    const { id, page, size } = req.query;
    const { pageData, hasNext } = await getPaginatedData(
      content,
      { userId: id },
      page,
      size,
      true
    );
    await res.status(200).json({ posts: pageData, hasNext });
  } catch (error) {
    printError(error);
    res.status(400).send(error);
  }
};

const toggleLike = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = getUserId(res);
    const response = await content.findOne({ _id: postId }).then((response) => {
      console.log("bef res", response);
      if (response.likedBy.includes(userId)) {
        response.likedBy.splice(response.likedBy.indexOf(userId), 1);
      } else {
        response.likedBy.push(userId);
      }
      return response;
    });
    await content.findOneAndUpdate({ _id: postId }, response);
    res.status(200).send(response);
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
          const userData = await findOneUser({ _id: userId });
          record["profileImage"] = userData?.profileImageUrl;
          record["profileName"] = userData.full_name;
          return record;
        })
      );
      return { pageData, hasNext };
    });
    res.status(200).json({ posts: pageData, hasNext });
  } catch (error) {
    printError(error);
    res.status(400).send(error);
  }
};

module.exports = {
  addContent,
  getPostWithId,
  getLatestPost,
  toggleLike,
};
