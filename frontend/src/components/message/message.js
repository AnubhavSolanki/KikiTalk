import styles from "./message.module.css";
import React from "react";
import LeftPane from "./leftPane";
import RightPane from "./rightPane";
import { useEffect } from "react";
import { createSocket, resetSocket } from "../../features/socketSlice";
import { useDispatch } from "react-redux";

const Message = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(createSocket({ token }));
    return () => {
      dispatch(resetSocket());
    };
  }, [dispatch, token]);

  return (
    <div className={styles.wrapper}>
      <LeftPane />
      <RightPane />
    </div>
  );
};

export default Message;
