import React from "react";
import { uploadImage } from "../../utils/uploadImage";
import styles from "./createPost.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { post } from "../../utils/requests";
import image from "../../assets/images/picture.png";
import { removeModal } from "../../utils/createModal";
import { promiseToast } from "../../utils/toaster";

const CreatePost = () => {
  const user = useSelector(selectUser);
  const saveToDatabase = async (imageDetail) => {
    const data = {
      userId: user.id,
      data: imageDetail,
      contentType: "Image",
    };
    await post(`${process.env.REACT_APP_BASE_URL}/addContent`, data);
  };

  const onSubmit = async ([Content]) => {
    const contentSubmissionPromise = new Promise(async (resolve, reject) => {
      if (!Content) reject("No Content");
      try {
        const imageDetail = await uploadImage(Content);
        if (!imageDetail) throw new Error("Didn't recieved Image Detail");
        saveToDatabase(imageDetail);
        resolve("Image Posted Successfully");
      } catch (err) {
        reject(err);
      } finally {
        removeModal();
      }
    });
    promiseToast(contentSubmissionPromise, {
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
