import React, { useEffect, useRef, useState } from "react";
import styles from "./cropImage.module.css";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import { canvasPreview } from "./canvasPreview";
import "react-image-crop/dist/ReactCrop.css";
import { post } from "../../utils/requests";
import { useDispatch } from "react-redux";
import { addPost } from "../../features/postSlice";
import { removeModal } from "../../utils/createModal";
import { promiseToast } from "../../utils/toaster";
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 30,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

const CropImage = ({ imgSrc, options }) => {
  options = options ?? {
    api: `${process.env.REACT_APP_BASE_URL}/addContent`,
    want_caption: true,
    aspect: 3.5 / 4.5,
    dispatchFunc: (response) =>
      addPost({
        post: response.data,
      }),
  };
  const [crop, setCrop] = useState();
  const previewCanvasRef = useRef(null);
  const [output, setOutput] = useState(null);
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();
  const imgRef = useRef(null);
  const aspect = options.aspect;
  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }
  function useDebounceEffect(fn, waitTime, deps) {
    useEffect(() => {
      const t = setTimeout(() => {
        fn.apply(undefined, deps);
      }, waitTime);

      return () => {
        clearTimeout(t);
      };
    }, deps);
  }

  useDebounceEffect(
    async () => {
      if (
        output?.width &&
        output?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(imgRef.current, previewCanvasRef.current, output);
      }
    },
    100,
    [output]
  );

  const saveToDatabase = async (base64) => {
    const data = {
      base64,
      description: caption,
    };
    return await post(options.api, data);
  };

  const handlePost = async () => {
    const contentSubmissionPromise = new Promise(async (resolve, reject) => {
      if (!output) reject("No Content");
      try {
        const base64 = previewCanvasRef.current
          .toDataURL("image/jpeg")
          .split(";base64,")[1];
        const response = await saveToDatabase(base64);
        dispatch(options.dispatchFunc(response));
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
  function generateAddPost() {
    return (
      <div className={styles.addPost}>
        {options.want_caption && (
          <>
            <p>Add Caption</p>
            <textarea
              onChange={(e) => setCaption(e.target.value)}
              id="w3review"
              name="w3review"
              rows="4"
              cols="50"
            ></textarea>{" "}
          </>
        )}
        <button onClick={handlePost}>Post</button>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div>
        {imgSrc && (
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setOutput(c)}
            aspect={aspect}
          >
            <img ref={imgRef} alt="Crop me" src={imgSrc} onLoad={onImageLoad} />
          </ReactCrop>
        )}
        <div className={styles.footer}>
          {output && (
            <>
              <p>Preview</p>
              <canvas
                id="croppedImage"
                ref={previewCanvasRef}
                style={{
                  border: "1px solid black",
                  objectFit: "contain",
                  width: output.width,
                  height: output.height,
                }}
              />
              {generateAddPost()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropImage;
