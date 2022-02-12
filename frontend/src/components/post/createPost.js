import React from "react";
import { uploadImage } from "../../utils/uploadImage";
import styles from "./createPost.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { post } from "../../utils/requests";

const CreatePost = () => {
  const user = useSelector(selectUser);
  const saveToDatabase = async (imageDetail) => {
    const data = {
      userId: user.id,
      data: imageDetail,
      contentType: "Image",
    };
    const response = await post(
      `${process.env.REACT_APP_BASE_URL}/addContent`,
      data
    );
    console.log(response);
  };

  const onSubmit = async ([Content]) => {
    if (Content) {
      try {
        const imageDetail = await uploadImage(Content);
        if (!imageDetail) throw new Error("Didn't recieved Image Detail");
        saveToDatabase(imageDetail);
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
        <input type="file" onChange={(event) => onSubmit(event.target.files)} />
      </form>
    </div>
  );
};

export default CreatePost;
