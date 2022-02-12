const getCount = (model, filter = {}) => {
  return new Promise((resolve, reject) => {
    model.countDocuments(filter, (error, count) => {
      if (error) {
        reject(error);
      }
      resolve(count);
    });
  });
};

module.exports = {
  getCount,
};
