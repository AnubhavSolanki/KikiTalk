import React from "react";
import styles from "./confirmDelete.module.css";
import { removeModal } from "../../../utils/createModal";
import { deleteMethod } from "../../../utils/requests";
import { promiseToast } from "../../../utils/toaster";
import { useDispatch } from "react-redux";
import { decreasePostCount } from "../../../features/profileSlice";
import { removeFromAllPost } from "../../../features/allPosts";
import { removePost } from "../../../features/postSlice";

const ConfirmDelete = ({ postId }) => {
  const dispatch = useDispatch();

  const handleCancel = () => {
    removeModal();
  };
  const handleDeletePost = async () => {
    const contentDeletionPromise = new Promise(async (resolve, reject) => {
      try {
        await deleteMethod(`${process.env.REACT_APP_BASE_URL}/post`, {
          postId,
        });
        dispatch(removePost({ postId }));
        dispatch(removeFromAllPost({ postId }));
        dispatch(decreasePostCount());
        resolve();
      } catch (err) {
        console.log(err);
        reject();
      } finally {
        removeModal();
      }
    });
    await promiseToast(contentDeletionPromise, {
      pending: "Deleting",
      success: "Post Deleted Successfully",
    });
  };
  return (
    <div className={styles.wrapper}>
      <span align="center" className={styles.heading}>
        Delete Post
      </span>
      <p>Are you sure you want to delete post?</p>
      <div className={styles.buttonGroup}>
        <button onClick={handleDeletePost} data-btn className={styles.delete}>
          Delete
        </button>
        <button onClick={handleCancel} data-btn>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
