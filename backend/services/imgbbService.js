const imgbbUploader = require("imgbb-uploader/lib/cjs");

const uploadImage = (base64string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const options = {
        apiKey: process.env.IMGBB_API_KEY,
        base64string: base64string,
      };
      const response = await imgbbUploader(options);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  uploadImage,
};
