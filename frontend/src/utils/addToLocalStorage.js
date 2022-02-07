export const addDataToLocalStorage = (data) => {
  Object.entries(data).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });
  window.dispatchEvent(new Event("storage"));
};
