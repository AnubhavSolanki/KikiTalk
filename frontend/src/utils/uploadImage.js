const imgbbUploader = require("imgbb-uploader");

const convertImagetoBase64 = (image) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = (error) => reject(error);
  });
};

export const uploadImage = (image) => {
  return new Promise(async (resolve, reject) => {
    try {
      const options = {
        apiKey: process.env.REACT_APP_IMGBB_API_KEY,
        base64string: await convertImagetoBase64(image),
      };
      const response = await imgbbUploader(options);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
