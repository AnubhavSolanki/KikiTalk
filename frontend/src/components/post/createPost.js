import React from "react";
import { convertImagetoBase64 } from "../../utils/imgToBase64";
import styles from "./createPost.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { post } from "../../utils/requests";
import image from "../../assets/images/picture.png";
import { removeModal } from "../../utils/createModal";
import { promiseToast } from "../../utils/toaster";
import { addPost } from "../../features/postSlice";

const CreatePost = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const saveToDatabase = async (base64) => {
    const data = {
      userId: user.id,
      base64,
    };
    return await post(`${process.env.REACT_APP_BASE_URL}/addContent`, data);
  };

  const onSubmit = async ([Content]) => {
    const contentSubmissionPromise = new Promise(async (resolve, reject) => {
      if (!Content) reject("No Content");
      try {
        const base64 = await convertImagetoBase64(Content);
        const response = await saveToDatabase(base64);
        dispatch(
          addPost({
            post: response.data,
          })
        );
        resolve();
      } catch (err) {
        console.log(err);
        reject();
      } finally {
        removeModal();
      }
    });
    await promiseToast(contentSubmissionPromise, {
      pending: "Uploading",
      success: "Post Uploaded Successfully",
      error: "Error Occured",
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <span>Create New Post</span>
      </div>
      <form className={styles.container}>
        <input
          hidden
          type="file"
          onChange={(event) => onSubmit(event.target.files)}
        />
        <img
          alt="browseImage"
          onClick={() => {
            document.querySelector('input[type="file"]').click();
          }}
          src={image}
          className={styles.image}
        />
        <span className={styles.instruction}>Click above to browse images</span>
      </form>
    </div>
  );
};

export default CreatePost;
