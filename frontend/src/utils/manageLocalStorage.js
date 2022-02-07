export const addDataToLocalStorage = (data) => {
  Object.entries(data).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });
  window.dispatchEvent(new Event("storage"));
};

export const removeDataFromLocalStorage = (data) => {
  data.forEach((item) => {
    localStorage.removeItem(item);
  });
  window.dispatchEvent(new Event("storage"));
};
