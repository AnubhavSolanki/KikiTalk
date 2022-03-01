const getEnvironment = () => {
  return process.env.ENVIRONMENT ?? "dev";
};
module.exports = {
  getEnvironment,
};
