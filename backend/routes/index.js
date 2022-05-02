const router = require("express").Router();
const express = require("express");
const path = require("path");
const cors = require("cors");
const {
  addContent,
  getLatestPost,
  addLikes,
  removeLikes,
  getPostWithId,
  toggleLike,
  getPostWithPostId,
  getLikedBy,
} = require("../controllers/contentController");
const { addComment, getComments } = require("../controllers/commentController");
const {
  login,
  loginWithToken,
  register,
} = require("../controllers/authController");
const { verifyToken } = require("../middleware/auth");
const {
  forgotPasswordMethod,
  verifyOtp,
  saveNewPassword,
} = require("../controllers/forgotPasswordController");

const checkBlackListToken = require("../middleware/checkBlacklistToken");
const {
  searchUserController,
  getProfileDetail,
  updateProfileName,
  updateProfileImage,
} = require("../controllers/userController");
const {
  toggleFollower,
  getFollowers,
  getFollowings,
} = require("../controllers/followerController");
const { getNotifications } = require("../controllers/notifications.controller");

const {
  addMessage,
  getLatestMessages,
} = require("../controllers/messageController");
const {
  getMessageChannels,
} = require("../controllers/messageChannelController");

router.use(cors());
router.use(express.static(path.join(__dirname, "../build")));
router.use(express.urlencoded({ extended: false, limit: "50mb" }));
router.use(express.json({ limit: "50mb" }));

router.get("/latestPost", verifyToken, getLatestPost);
router.get("/latestComments", verifyToken, getComments);
router.get("/searchUser", verifyToken, searchUserController);
router.get("/allPostsWithId", verifyToken, getPostWithId);
router.get("/latestNotifications", verifyToken, getNotifications);
router.get("/latestMessages", verifyToken, getLatestMessages);
router.get("/channelIds", verifyToken, getMessageChannels);
router.get("/profileDetail", verifyToken, getProfileDetail);
router.get("/postWithPostId", verifyToken, getPostWithPostId);
router.get("/followers", verifyToken, getFollowers);
router.get("/followings", verifyToken, getFollowings);
router.get("/likedBy", verifyToken, getLikedBy);

router.post("/auth/login", login);
router.post("/auth/register", register);
router.post("/forgotPassword", forgotPasswordMethod);
router.post("/verifyOtp", verifyOtp);
router.post("/saveNewPassword", checkBlackListToken, saveNewPassword);
router.post("/addContent", verifyToken, addContent);
router.post("/addComment", verifyToken, addComment);
router.post("/auth/loginWithToken", verifyToken, loginWithToken);
router.post("/toggleLike", verifyToken, toggleLike);
router.post("/follower", verifyToken, toggleFollower);
router.post("/addMessage", verifyToken, addMessage);
router.post("/updateProfileName", verifyToken, updateProfileName);
router.post("/updateProfileImage", verifyToken, updateProfileImage);

router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});
module.exports = router;
