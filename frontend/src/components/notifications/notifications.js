import styles from "./notifications.module.css";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get } from "../../utils/requests";
import {
  addNotifications,
  getNotificationState,
} from "../../features/notifications";
import { selectUser } from "../../features/userSlice";

const fetchNotifications = (notifications, dispatch, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const limit = 2;
      const response = await get(
        `${process.env.REACT_APP_BASE_URL}/latestNotifications`,
        {
          params: { page: notifications.length / limit, size: limit, id },
        }
      );
      if (response.status === 200) {
        if (response.data.notifications.length)
          dispatch(
            addNotifications({
              notifications: response.data.notifications,
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

const Notifications = () => {
  const dispatch = useDispatch();
  const notificationState = useSelector(getNotificationState);
  const user = useSelector(selectUser);
  useEffect(() => {
    if (notificationState.notifications.length === 0) {
      fetchNotifications(notificationState.notifications, dispatch, user.id);
    }
  });
  return (
    <div id="notificationsScrollableDiv" className={styles.wrapper}>
      <InfiniteScroll
        dataLength={notificationState.notifications.length}
        next={() =>
          fetchNotifications(notificationState.notifications, dispatch, user.id)
        }
        hasMore={notificationState.hasNext}
        loader={<h4>Loading...</h4>}
        scrollableTarget="notificationsScrollableDiv"
      >
        {notificationState.notifications.map((post, index) => {
          return <div key={index} index={index} />;
        })}
      </InfiniteScroll>
    </div>
  );
};

export default Notifications;
