const router = require("express").Router();
const express = require('express');
const cors = require('cors');
const { addContent } = require("../controllers/contentController");
const { addComment } = require("../controllers/commentController");
const { login } = require("../controllers/authController");
const { register } = require("../controllers/authController");

router.use(cors());
router.use(express.urlencoded({ extended: false }));

router.get('/', (req, res) => {
    res.send("hello world!!!");
})

router.post('/addContent', addContent);
router.post('/addComment', addComment);
router.post('/auth/login', login);
router.post('/auth/register', register);

module.exports = router;
