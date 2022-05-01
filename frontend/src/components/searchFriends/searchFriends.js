import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ProfileContainer from "./profileContainer";
import styles from "./searchFriends.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getSearchUserState,
  setSearchResult,
  unsetSearchResult,
} from "../../features/searchUserSlice";
import { get } from "../../utils/requests";
import { getLoadingState, setLoading } from "../../features/loadingSlice";
import Loader from "react-js-loader";

const fetchSearchResults = (searchText, searchResult, dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(setLoading({ searchUserLoading: true }));
      const limit = 15;
      const response = await get(
        `${process.env.REACT_APP_BASE_URL}/searchUser`,
        {
          params: {
            searchText,
            page: searchResult.length / limit,
            size: limit,
          },
        }
      );
      if (response.status === 200 && response.data.searchResult.length) {
        dispatch(
          setSearchResult({
            searchText,
            searchResult: response.data.searchResult,
            hasNext: response.data.hasNext,
          })
        );
        resolve();
      }
    } catch (err) {
      console.log(err);
      reject(false);
    } finally {
      dispatch(setLoading({ searchUserLoading: false }));
    }
  });
};

const SearchFriends = ({ history }) => {
  const dispatch = useDispatch();
  let timeout;
  const [searchText, setSearchText] = useState("");
  const searchUserState = useSelector(getSearchUserState);
  const isLoading = useSelector(getLoadingState("searchUserLoading"));
  const handleChange = (event) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      const searchText = event.target.value;
      dispatch(unsetSearchResult());
      setSearchText(searchText);
      if (searchText) fetchSearchResults(searchText, [], dispatch);
    }, 1000);
  };
  return (
    <div className={styles.searchContainer}>
      <h2>Search Your Friends</h2>
      <input
        onChange={handleChange}
        value={searchUserState.searchText}
        placeholder={"Search"}
      />
      <div
        id="searchResultScrollableDiv"
        className={styles.searchResultContainer}
      >
        <InfiniteScroll
          dataLength={searchUserState.searchResult.length}
          next={() =>
            fetchSearchResults(
              searchText,
              searchUserState.searchResult,
              dispatch
            )
          }
          hasMore={searchUserState.hasNext || isLoading}
          loader={
            <Loader
              type="bubble-top"
              bgColor={"#FFFFFF"}
              title={"Searching Friends"}
              color={"#FFFFFF"}
              size={30}
            />
          }
          endMessage={
            searchUserState.searchResult.length === 0 ? (
              <p align="center">
                {searchText === ""
                  ? `Search Your Friend Here`
                  : `Couldn't found anything`}
              </p>
            ) : (
              <></>
            )
          }
          scrollableTarget="searchResultScrollableDiv"
        >
          {searchUserState.searchResult.map((userData, index) => {
            return (
              <ProfileContainer
                key={index}
                history={history}
                userData={userData}
              />
            );
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default SearchFriends;
