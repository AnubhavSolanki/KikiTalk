import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const getWindowUrl = () => {
  return { windowUrl: window.location.href };
};

export const useWindowUrlChange = () => {
  const [windowUrl, setWindowUrl] = useState(getWindowUrl());
  const history = useHistory();
  useEffect(() => {
    const handleURLChange = () => {
      setWindowUrl(getWindowUrl());
    };
    history.listen(handleURLChange);
  }, [history]);

  return windowUrl;
};
