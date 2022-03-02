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

const fetchSearchResults = (searchText, searchResult, dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(searchText);
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
        console.log(response.data);
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
    }
  });
};

const SearchFriends = ({ history }) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const searchUserState = useSelector(getSearchUserState);
  const handleChange = (event) => {
    const searchText = event.target.value;
    dispatch(unsetSearchResult());
    setSearchText(searchText);
    if (searchText) fetchSearchResults(searchText, [], dispatch);
  };
  return (
    <div className={styles.searchContainer}>
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
          hasMore={searchUserState.hasNext}
          loader={
            searchUserState.searchResult.length > 0 ? (
              <h4>Loading...</h4>
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
