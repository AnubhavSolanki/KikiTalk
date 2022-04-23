import React from "react";
import styles from "./createPost.module.css";
import createModal from "../../utils/createModal";
import { FaImage } from "react-icons/fa";
import CropImage from "./cropImage";

const CreatePost = () => {
  const onSubmit = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        createModal(<CropImage imgSrc={reader.result.toString() || ""} />)
      );
      if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <span>Create New Post</span>
      </div>
      <form
        onClick={() => {
          document.querySelector("#postInput").click();
        }}
        className={styles.container}
      >
        <input id="postInput" hidden type="file" onChange={onSubmit} />
        <FaImage size={70} />
        <span className={styles.instruction}>Click above to browse images</span>
      </form>
    </div>
  );
};

export default CreatePost;
