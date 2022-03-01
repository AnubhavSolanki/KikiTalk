let tokenTimeout;
const timeout = 2 * 1000 * 60 * 60; // 2 hours
export const addDataToLocalStorage = (data) => {
  Object.entries(data).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });
  tokenTimeout = setTimeout(() => {
    removeDataFromLocalStorage(["token"]);
  }, timeout);
  window.dispatchEvent(new Event("storage"));
};

export const removeDataFromLocalStorage = (data) => {
  data.forEach((item) => {
    localStorage.removeItem(item);
  });
  if (tokenTimeout) clearTimeout(tokenTimeout);
  window.dispatchEvent(new Event("storage"));
};
