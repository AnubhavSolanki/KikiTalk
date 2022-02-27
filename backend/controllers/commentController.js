const comment = require("../database/models/comment");
const { getCount } = require("../database/methods/getCount");
const { printError } = require("../services/coloredPrint");
const user = require("../database/models/user");

const addComment = async (req, res) => {
  try {
    let response = await comment.create(req.body);
    const { userId } = response;
    const userData = await user.findOne({ _id: userId });
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
    let { postId, from, to } = req.query;

    let hasNext = true;
    const commentCount = await getCount(comment);
    if (commentCount <= from) {
      res.status(200).json({ comments: [], hasNext: false });
    } else if (commentCount - to < 0) {
      to = commentCount;
      hasNext = false;
    } else if (commentCount - to === 0) {
      hasNext = false;
    }
    let pageCount = from - to;
    let response = await comment
      .find({ postId })
      .skip(commentCount - to)
      .limit(pageCount);

    response = await Promise.all(
      response.map(async (record) => {
        const { userId } = record;
        const userData = await user.findOne({ _id: userId });
        record._doc["profileImage"] = userData?.image;
        record._doc["profileName"] = userData.full_name;
        return record;
      })
    );
    response.reverse();
    res.status(200).json({ comments: response, hasNext: hasNext });
  } catch (error) {
    printError(error);
    res.status(400).send(error.message);
  }
};

module.exports = {
  addComment,
  getComments,
};
