const {
  getPaginatedData,
  paginateData,
} = require("../database/methods/getPaginatedData");
const content = require("../database/models/content");
const user = require("../database/models/user");
const { printError } = require("../services/coloredPrint");
const { uploadImage } = require("../services/imgbbService");
const { getUserId } = require("../util/getUserId");
const { findMyFollower } = require("./followerController");
const { findOneUser } = require("./userController");
const { deleteComments } = require("./commentController");

const addContent = async (req, res) => {
  try {
    const { base64 } = req.body;
    const userId = getUserId(res);
    const userData = await findOneUser({ _id: userId });
    if (!userData) throw new Error("User not exists");
    req.body = {
      ...req.body,
      data: await uploadImage(base64),
      contentType: "image",
    };
    const response = await content.create({ ...req.body, userId });
    response._doc["profileImage"] = userData?.profileImageUrl;
    response._doc["profileName"] = userData.full_name;
    res.status(200).json(response);
  } catch (error) {
    printError(error);
    res.status(400).send(error.message);
  }
};

const deleteContent = async (req, res) => {
  try {
    const { postId } = req.body;
    if (!postId) res.status(400).json({ message: "Post Already Deleted" });
    await deleteComments({ postId });
    await content.deleteOne({ _id: postId });
    res.status(200).json({ message: "Post Deleted Successfully" });
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
    await res.status(200).json({ posts: pageData, hasNext });
  } catch (error) {
    printError(error);
    res.status(400).send(error);
  }
};

const getPostWithPostId = async (req, res) => {
  try {
    const { postId } = req.query;
    const response = await content.findOne({ _id: postId });
    if (!response) {
      res.status(200).json({ deleted: true });
      return;
    }
    const userData = await findOneUser({ _id: response.userId });
    response._doc["profileImage"] = userData?.profileImageUrl;
    response._doc["profileName"] = userData.full_name;
    res.status(200).json(response);
  } catch (error) {
    printError(error);
    res.status(400).send(error);
  }
};

const getLikedBy = async (req, res) => {
  try {
    const { postId, page, size } = req.query;
    const myId = getUserId(res);
    const postData = await content.findOne({ _id: postId });
    const { pageData, hasNext } = paginateData(postData.likedBy, page, size);
    const response = [];
    for (const data of pageData) {
      const userData = await user.findOne({ _id: data });
      const follow = !!(await findMyFollower({
        _id: data,
        followerId: myId,
      }));
      response.push({
        ...data,
        userData,
        buttonText: follow ? "Unfollow" : "Follow",
      });
    }
    res.status(200).json({ pageData: response, hasNext });
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
  getPostWithPostId,
  getLikedBy,
  deleteContent,
};
