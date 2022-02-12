import React, { useEffect, useState } from "react";
import { get } from "../../utils/requests";
import Post from "../post/post";
import Stories from "../stories/stories";
import styles from "./home.module.css";
import InfiniteScroll from "react-infinite-scroll-component";

const fetchPosts = ([posts, setPosts]) => {
  return new Promise(async (resolve, reject) => {
    try {
      const limit = 5;
      const response = await get(
        `${process.env.REACT_APP_BASE_URL}/latestPost`,
        {
          params: { from: posts.length, to: posts.length + limit },
        }
      );
      if (response.status === 200) {
        setPosts((result) => Array.from([...result, ...response.data.posts]));

        console.log(posts);
        resolve(response.data.hasNext);
      }
    } catch (err) {
      console.log(err);
      reject(false);
    }
  });
};

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const getNewPosts = () => {
    fetchPosts([posts, setPosts]).then((hasMore) => {
      setHasMore(hasMore);
    });
  };

  useEffect(() => {
    getNewPosts();
  }, []);

  return (
    <div id="scrollableDiv" className={styles.wrapper}>
      <div className={styles.header}>
        <Stories />
        <InfiniteScroll
          dataLength={posts.length}
          next={getNewPosts}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
          endMessage={
            <h3 style={{ color: "white" }} align="center">
              No new posts available
            </h3>
          }
        >
          {posts.map((post, index) => {
            return <Post key={index} postData={post} />;
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Home;
