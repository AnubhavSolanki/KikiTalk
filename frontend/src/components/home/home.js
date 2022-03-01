import React, { useEffect } from "react";
import { get } from "../../utils/requests";
import Post from "../post/post";
import Stories from "../stories/stories";
import { useDispatch, useSelector } from "react-redux";
import styles from "./home.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { addPosts, getPostState } from "../../features/postSlice";

const fetchPosts = (posts, dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const limit = 2;
      const response = await get(
        `${process.env.REACT_APP_BASE_URL}/latestPost`,
        {
          params: { page: posts.length / limit, size: limit },
        }
      );
      if (response.status === 200) {
        if (response.data.posts.length)
          dispatch(
            addPosts({
              posts: response.data.posts,
              hasNext: response.data.hasNext,
            })
          );
      }
    } catch (err) {
      console.log(err);
      reject(false);
    }
  });
};

const Home = (props) => {
  const dispatch = useDispatch();
  const postState = useSelector(getPostState);

  useEffect(() => {
    if (postState.posts.length === 0) {
      fetchPosts(postState.posts, dispatch);
    }
  }, []);

  return (
    <div id="postScrollableDiv" className={styles.wrapper}>
      <div className={styles.header}>
        {/* <Stories /> */}
        <InfiniteScroll
          dataLength={postState.posts.length}
          next={() => fetchPosts(postState.posts, dispatch)}
          hasMore={postState.hasNext}
          loader={<h4>Loading...</h4>}
          scrollableTarget="postScrollableDiv"
          endMessage={
            <h3 style={{ color: "white" }} align="center">
              No new posts available
            </h3>
          }
        >
          {postState.posts.map((post, index) => {
            return <Post key={index} index={index} postData={post} />;
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Home;
