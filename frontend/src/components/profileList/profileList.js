import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { getLoadingState, setLoading } from "../../features/loadingSlice";
import {
  addProfiles,
  getProfileListState,
  resetProfileList,
} from "../../features/profileListSlice";
import { get } from "../../utils/requests";
import Loader from "react-js-loader";
import styles from "./profileList.module.css";
import { useEffect } from "react";
import ProfileModel from "./profileModel";

const fetchProfileList = (profileList, dispatch, url, params) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(setLoading({ profileListLoading: true }));
      const limit = 15;
      const response = await get(url, {
        params: { page: profileList.length / limit, size: limit, ...params },
      });
      if (response.status === 200) {
        dispatch(
          addProfiles({
            profiles: [...response.data.pageData],
            hasNext: response.data.hasNext,
          })
        );
        resolve();
      }
    } catch (err) {
      console.log(err);
      reject(false);
    } finally {
      dispatch(setLoading({ profileListLoading: false }));
    }
  });
};

const ProfileList = ({ options }) => {
  const { url, params, button, heading, emptyMessage } = options;
  const profileListState = useSelector(getProfileListState);
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoadingState("profileListLoading"));
  useEffect(() => {
    fetchProfileList(profileListState.profileList, dispatch, url, params);
    return () => {
      dispatch(resetProfileList());
    };
  }, []);

  return (
    <>
      <div className={styles.heading}>
        <span>{heading}</span>
      </div>
      <div id="profileListScrollableDiv" className={styles.wrapper}>
        <InfiniteScroll
          dataLength={profileListState.profileList.length}
          next={() =>
            fetchProfileList(
              profileListState.profileList,
              dispatch,
              url,
              params
            )
          }
          hasMore={profileListState.hasNext || isLoading}
          loader={
            <Loader
              type="spinner-default"
              bgColor={"#000000"}
              color={"#000000"}
              size={50}
            />
          }
          endMessage={
            profileListState.profileList.length === 0 ? (
              <p align="center">{emptyMessage}</p>
            ) : (
              <></>
            )
          }
          scrollableTarget="profileListScrollableDiv"
        >
          {profileListState.profileList.map(
            (profileData, index) => (
              <div key={index}>
                <ProfileModel
                  history={options.history}
                  index={index}
                  userData={profileData.userData}
                  button={{ ...button, text: profileData.buttonText }}
                />
              </div>
            )
            // return commentTemplate(profileData, index);
          )}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default ProfileList;
