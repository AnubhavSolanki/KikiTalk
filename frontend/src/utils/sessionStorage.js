import { useEffect, useState } from "react";

const getSessionStorage = () => {
  return window.sessionStorage;
};

const setInSessionStorage = (key, value) => {
  window.sessionStorage.setItem(key, value);
};

const removeFromSessionStorage = (key) => {
  window.sessionStorage.removeItem(key);
};

export const useSessionStorage = () => {
  const [sessionData, setSessionData] = useState(getSessionStorage);
  useEffect(() => {
    const handleSessionStorageChange = () => {
      setSessionData(getSessionStorage());
    };
    window.addEventListener("sessionStorage", handleSessionStorageChange);
    return () =>
      window.removeEventListener("sessionStorage", handleSessionStorageChange);
  });

  const getLastUrl = () => {
    return window.sessionStorage.getItem("LatestWindowUrl");
  };

  const addData = (data) => {
    if (!Array.isArray(data[0])) {
      setInSessionStorage(data[0], data[1]);
    } else {
      data.forEach(([key, value]) => {
        setInSessionStorage(key, value);
      });
    }
    dispatchEvent(new Event("sessionStorage"));
  };

  const removeData = (data) => {
    if (!Array.isArray(data)) {
      removeFromSessionStorage(data);
    } else {
      data.forEach((key) => removeFromSessionStorage(key));
    }
    dispatchEvent(new Event("sessionStorage"));
  };

  return { sessionData, addData, removeData, getLastUrl };
};
