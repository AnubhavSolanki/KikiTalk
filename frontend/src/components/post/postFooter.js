import React, { useState } from "react";
import {
  FaHeart,
  FaRegComment,
  FaRegHeart,
  FaRegPaperPlane,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import TimeAgo from "timeago-react";
import { setActive } from "../../features/navSlice";
import {
  changeButtonText,
  toggleFollowOnList,
} from "../../features/profileListSlice";
import { addProfileId } from "../../features/profileSlice";
import { getSocket } from "../../features/socketSlice";
import { selectUser } from "../../features/userSlice";
import CreateModal, { removeModal } from "../../utils/createModal";
import { post } from "../../utils/requests";
import CompletePost from "../completePost/completePost";
import ProfileList from "../profileList/profileList";
import styles from "./post.module.css";
import Loader from "react-js-loader";

export function PostFooter({ options }) {
  const {
    postData,
    history,
    index,
    openComments,
    likeStatusSelector,
    likeCountSelector,
    dispatchActionForLike,
  } = options;
  const socket = useSelector(getSocket);
  const user = useSelector(selectUser);
  const [postLoaded, setPostLoaded] = useState(false);

  const likeStatus = useSelector(
    likeStatusSelector({ index, userId: user.id, postData })
  );
  const likeCount = useSelector(likeCountSelector({ index, postData }));
  const dispatch = useDispatch();

  const openPostContainer = () => {
    if (!openComments) return;
    CreateModal(
      <CompletePost
        options={{
          user,
          history,
          postData,
          index,
          openComments: false,
          likeStatusSelector,
          likeCountSelector,
          dispatchActionForLike,
        }}
      />
    );
  };

  const onLike = async () => {
    try {
      const response = await post(
        `${process.env.REACT_APP_BASE_URL}/toggleLike`,
        {
          postId: postData._id,
        }
      );
      dispatchActionForLike({ index, response, postData });
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickOnLikeCount = () => {
    CreateModal(
      <ProfileList
        options={{
          url: `${process.env.REACT_APP_BASE_URL}/likedBy`,
          history,
          params: { postId: postData._id },
          heading: "Likes",
          emptyMessage: "No Likes",
          button: {
            onClick: ({ userId, index }) => {
              dispatch(toggleFollowOnList({ index }));
            },
          },
        }}
      />
    );
  };

  const openSendList = () => {
    CreateModal(
      <ProfileList
        options={{
          url: `${process.env.REACT_APP_BASE_URL}/followers`,
          history,
          params: { userId: user.id, isForSend: true },
          heading: "Send To",
          emptyMessage: "No Followers",
          button: {
            onClick: ({ userId, index }) => {
              socket.emit("Send Message", {
                recieverId: userId,
                message: `postId-${postData._id}`,
              });
              dispatch(changeButtonText({ index, text: "Sent" }));
            },
          },
        }}
      />
    );
  };

  const handleClickOnProfileName = () => {
    removeModal();
    dispatch(addProfileId({ id: postData.userId }));
    dispatch(setActive({ index: 1 }));
    history.push(`profile`);
  };

  return (
    <div className={styles.containerWrapper}>
      <div className={styles.post}>
        {!postLoaded && <div className={styles.dummy}></div>}
        <img
          alt="Post"
          src={postData?.data?.display_url}
          onLoad={() => setPostLoaded(true)}
          style={!postLoaded ? { display: "none" } : {}}
        />
        {!postLoaded && (
          <div className={styles.proxyBlock}>
            <Loader
              type="spinner-default"
              bgColor={"#FFFFFF"}
              color={"#FFFFFF"}
              size={50}
            />
          </div>
        )}
      </div>
      <div className={styles.post_footer}>
        <div className={styles.footerWrapper}>
          <div className={styles.footer}>
            <div data-btn onClick={onLike} className={styles.like}>
              {likeStatus ? (
                <FaHeart style={{ color: "red" }} size={25} />
              ) : (
                <FaRegHeart size={25} />
              )}
            </div>
            <div
              data-btn
              onClick={openPostContainer}
              className={styles.comment}
            >
              <FaRegComment size={25} />
            </div>
            <div data-btn className={styles.share} onClick={openSendList}>
              <FaRegPaperPlane size={25} />
            </div>
          </div>
          <div data-btn onClick={handleClickOnLikeCount}>
            <span>{likeCount} likes</span>
          </div>
          <div className={styles.caption}>
            <span
              data-btn
              onClick={handleClickOnProfileName}
              className={styles.name}
            >
              {" "}
              {postData.profileName ?? "No Name"}
            </span>{" "}
            {postData?.description && postData?.description !== ""
              ? postData?.description
              : "No Description"}
          </div>
          {openComments && (
            <div>
              <span onClick={openPostContainer} style={{ cursor: "pointer" }}>
                View comments
              </span>
            </div>
          )}
          <div className={styles.post_time}>
            <TimeAgo datetime={postData.createdAt} />
          </div>
        </div>
      </div>
    </div>
  );
}
