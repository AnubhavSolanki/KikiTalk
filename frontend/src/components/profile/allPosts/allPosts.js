import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { SinglePostCard } from "./singlePostCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { get } from "../../../utils/requests";
import {
  addPosts,
  getAllPostsState,
  resetAllPosts,
} from "../../../features/allPosts";
import styles from "./allPosts.module.css";
import { getProfileState } from "../../../features/profileSlice";
import { getLoadingState, setLoading } from "../../../features/loadingSlice";
import Loader from "react-js-loader";

const fetchPostsWithId = async (posts, dispatch, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(setLoading({ allPostLoading: true }));
      const limit = 15;
      const response = await get(
        `${process.env.REACT_APP_BASE_URL}/allPostsWithId`,
        {
          params: { page: posts.length / limit, size: limit, id },
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
        resolve();
      }
    } catch (err) {
      console.log(err);
      reject(false);
    } finally {
      dispatch(setLoading({ allPostLoading: false }));
    }
  });
};

const AllPosts = () => {
  const dispatch = useDispatch();
  const postState = useSelector(getAllPostsState);
  const profileState = useSelector(getProfileState);
  const isLoading = useSelector(getLoadingState("allPostLoading"));

  useEffect(() => {
    if (postState.posts.length === 0)
      fetchPostsWithId(postState.posts, dispatch, profileState?.id);
    return () => {
      dispatch(resetAllPosts());
    };
  }, [profileState?.id]);

  return (
    <div id="allPostScrollableDiv" className={styles.wrapper}>
      <InfiniteScroll
        dataLength={postState.posts.length}
        next={() =>
          fetchPostsWithId(postState.posts, dispatch, profileState?.id)
        }
        hasMore={postState.hasNext || isLoading}
        loader={
          <Loader
            type="bubble-top"
            bgColor={"#FFFFFF"}
            color={"#FFFFFF"}
            size={30}
          />
        }
        scrollableTarget="allPostScrollableDiv"
      >
        {postState.posts.map((post, index) => {
          return <SinglePostCard key={index} index={index} postData={post} />;
        })}
      </InfiniteScroll>
    </div>
  );
};

export default AllPosts;
