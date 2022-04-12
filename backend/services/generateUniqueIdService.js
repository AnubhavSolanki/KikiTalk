const generateUniqueId = require("generate-unique-id");

const uid = () => {
  return generateUniqueId();
};

module.exports = {
  uid,
};
