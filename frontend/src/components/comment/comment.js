import React from "react";
import styles from "./comment.module.css";
import { promiseToast } from "../../utils/toaster";
import { post } from "../../utils/requests";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { addComments } from "../../features/commentSlice";

const Comment = ({ postId, shouldDispatch = false }) => {
  const user = useSelector(selectUser);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const postComment = async ({ comment }) => {
    await promiseToast(
      new Promise(async (resolve, reject) => {
        try {
          const data = {
            postId: postId,
            userId: user.id,
            comment: comment,
          };
          const response = await post(
            `${process.env.REACT_APP_BASE_URL}/addComment`,
            data
          );
          if (shouldDispatch) {
            dispatch(
              addComments({
                comments: [response.data],
              })
            );
          }
          resolve();
        } catch (err) {
          reject(err);
        }
      }),
      {
        pending: "Posting Comment",
        success: "Comment Posted Successfully",
        error: "Error Occured",
      }
    );
    reset();
  };
  return (
    <div>
      <form
        className={styles.comment_input_wrapper}
        onSubmit={handleSubmit(postComment)}
      >
        <input
          {...register("comment", { required: true })}
          className={styles.post_input}
          placeholder="Add a Comment"
        />
        <button className={styles.post_button}>Post</button>
      </form>
    </div>
  );
};

export default Comment;
