import React, { useEffect } from "react";
import { getLoadingState } from "../../features/loadingSlice";
import { useSelector } from "react-redux";
import Loader from "react-js-loader";
import styles from "./loading.module.css";
const Loading = () => {
  const isLoading = useSelector(getLoadingState());
  useEffect(() => {
    console.log(`loading state changed to : ${isLoading}`);
  }, [isLoading]);
  return isLoading ? (
    <div className={styles.wrapper}>
      <Loader
        type="bubble-top"
        bgColor={"#FFFFFF"}
        color={"#FFFFFF"}
        size={30}
      />
    </div>
  ) : (
    <></>
  );
};

export default Loading;
