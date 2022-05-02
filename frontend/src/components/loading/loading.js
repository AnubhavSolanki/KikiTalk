import React from "react";
import { getLoadingState } from "../../features/loadingSlice";
import { useSelector } from "react-redux";
import Loader from "react-js-loader";
import styles from "./loading.module.css";
const Loading = () => {
  const isLoading = useSelector(getLoadingState());
  return isLoading ? (
    <div className={styles.wrapper}>
      <Loader
        type="box-rectangular"
        bgColor={"#FFFFFF"}
        title="Loading"
        color={"#FFFFFF"}
        size={75}
      />
    </div>
  ) : (
    <></>
  );
};

export default Loading;
