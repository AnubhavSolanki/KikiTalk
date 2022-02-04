import React from "react";
import Post from "../post/post";
import Stories from "../stories/stories";
import styles from "./home.module.css";

const Home = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Stories />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <div>
          <h3 align="center">No new posts available</h3>
        </div>
      </div>
    </div>
  );
};

export default Home;
