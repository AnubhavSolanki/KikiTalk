import React from "react";
import { uploadImage } from "../../utils/uploadImage";
import styles from "./createPost.module.css";

const CreatePost = () => {
  const saveToDatabase = () => {};

  const onSubmit = async ([data]) => {
    if (data) {
      try {
        const response = await uploadImage(data);
        saveToDatabase(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div className={styles.heading}>
        <span>Create New Post</span>
      </div>
      <form className={styles.container}>
        <input type="file" onChange={(e) => onSubmit(e.target.files)} />
      </form>
    </div>
  );
};

export default CreatePost;
