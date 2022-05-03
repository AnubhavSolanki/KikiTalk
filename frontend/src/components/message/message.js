import styles from "./message.module.css";
import React, { useState } from "react";
import LeftPane from "./leftPane";
import RightPane from "./rightPane";
import { useEffect } from "react";
import useWindowDimensions from "../../utils/useWindowDimensions";

const Message = () => {
  const [showState, setShowState] = useState({
    leftPanel: true,
    rightPanel: true,
  });
  const { width } = useWindowDimensions();
  useEffect(() => {
    if (width <= 700) {
      setShowState({ leftPanel: true, rightPanel: false });
    } else {
      setShowState({ leftPanel: true, rightPanel: true });
    }
  }, [width]);
  return (
    <div className={styles.wrapper}>
      {showState.leftPanel && (
        <LeftPane showState={showState} setShowState={setShowState} />
      )}
      {showState.rightPanel && (
        <RightPane showState={showState} setShowState={setShowState} />
      )}
    </div>
  );
};

export default Message;
