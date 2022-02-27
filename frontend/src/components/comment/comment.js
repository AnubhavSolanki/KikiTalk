import React from "react";
import styles from "./comment.module.css";
import { promiseToast } from "../../utils/toaster";
import { post } from "../../utils/requests";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const Comment = ({ postId, setComments }) => {
  const user = useSelector(selectUser);
  const { register, handleSubmit, reset } = useForm();

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
          resolve();
          if (setComments) {
            setComments((previousComments) =>
              Array.from([response.data, ...previousComments])
            );
          }
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
