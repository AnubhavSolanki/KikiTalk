const router = require("express").Router();
const express = require("express");
const cors = require("cors");
const {
  addContent,
  getLatestPost,
  addLikes,
  removeLikes,
} = require("../controllers/contentController");
const { addComment, getComments } = require("../controllers/commentController");
const {
  login,
  loginWithToken,
  register,
} = require("../controllers/authController");
const verifyToken = require("../middleware/auth");
const {
  forgotPasswordMethod,
  verifyOtp,
  saveNewPassword,
} = require("../controllers/forgotPasswordController");

const checkBlackListToken = require("../middleware/checkBlacklistToken");
const { searchUserController } = require("../controllers/userController");
router.use(cors());
router.use(express.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  res.send("hello world!!!");
});

router.get("/latestPost", verifyToken, getLatestPost);
router.get("/latestComments", verifyToken, getComments);
router.get("/searchUser", verifyToken, searchUserController);

router.post("/auth/login", login);
router.post("/auth/register", register);
router.post("/forgotPassword", forgotPasswordMethod);
router.post("/verifyOtp", verifyOtp);
router.post("/saveNewPassword", checkBlackListToken, saveNewPassword);
router.post("/addContent", verifyToken, addContent);
router.post("/addComment", verifyToken, addComment);
router.post("/auth/loginWithToken", verifyToken, loginWithToken);
router.post("/addLikes", verifyToken, addLikes);
router.post("/removeLikes", verifyToken, removeLikes);

module.exports = router;
