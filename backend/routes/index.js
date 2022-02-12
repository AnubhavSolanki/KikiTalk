const router = require("express").Router();
const express = require("express");
const cors = require("cors");
const {
  addContent,
  getLatestPost,
  addLikes,
  removeLikes,
} = require("../controllers/contentController");
const { addComment } = require("../controllers/commentController");
const {
  login,
  loginWithToken,
  register,
} = require("../controllers/authController");
const verifyToken = require("../middleware/auth");
router.use(cors());
router.use(express.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  res.send("hello world!!!");
});

router.post("/auth/login", login);
router.post("/auth/register", register);
router.post("/addContent", verifyToken, addContent);
router.post("/addComment", verifyToken, addComment);
router.post("/auth/loginWithToken", verifyToken, loginWithToken);
router.get("/latestPost", verifyToken, getLatestPost);
router.post("/addLikes", addLikes);
router.post("/removeLikes", removeLikes);

module.exports = router;
