export const getEnvironment = () => {
  return process.env.REACT_APP_ENVIRONMENT ?? "development";
};
