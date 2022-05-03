import React, { useEffect } from "react";
import styles from "./leftPane.module.css";
import Channel from "./channel";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import {
  addChannel,
  getChannelState,
  getSelectedChannelId,
} from "../../features/channels";
import { get } from "../../utils/requests";
import { getLoadingState, setLoading } from "../../features/loadingSlice";
import Loader from "react-js-loader";

const fetchChannels = (channels, dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(setLoading({ channelLoading: true }));
      const limit = 10;
      const response = await get(
        `${process.env.REACT_APP_BASE_URL}/channelIds`,
        {
          params: { page: channels.length / limit, size: limit },
        }
      );
      if (response.status === 200) {
        if (response.data.channelIdList.length)
          dispatch(
            addChannel({
              channelIdList: response.data.channelIdList,
              hasNext: response.data.hasNext,
            })
          );
        resolve();
      }
    } catch (err) {
      console.log(err);
      reject(false);
    } finally {
      dispatch(setLoading({ channelLoading: false }));
      dispatch(setLoading({ loading: false }));
    }
  });
};

const LeftPane = ({ showState, setShowState }) => {
  const dispatch = useDispatch();
  const channelState = useSelector(getChannelState);
  const selectedId = useSelector(getSelectedChannelId);
  const isLoading = useSelector(getLoadingState("channelLoading"));

  useEffect(() => {
    if (channelState.channelIdList.length === 0) {
      fetchChannels(channelState.channelIdList, dispatch);
    } else {
      dispatch(setLoading({ loading: false }));
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <div id="channelScrollableDiv" className={styles.heading}>
        Messages
      </div>
      <InfiniteScroll
        dataLength={channelState?.channelIdList?.length}
        next={() => fetchChannels(channelState?.channelIdList, dispatch)}
        hasMore={channelState?.hasNext || isLoading}
        loader={
          <Loader
            type="bubble-top"
            bgColor={"#FFFFFF"}
            color={"#FFFFFF"}
            size={30}
          />
        }
        scrollableTarget="channelScrollableDiv"
      >
        {channelState.channelIdList.map((channel, index) => {
          return (
            <Channel
              showState={showState}
              setShowState={setShowState}
              key={index}
              index={index}
              channelData={channel}
              active={selectedId === index}
            />
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default LeftPane;
