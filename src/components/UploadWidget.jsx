/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";

function UploadWidget({ setImageUrl }) {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [image, setImage] = useState("");
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "du2uozszj",
        uploadPreset: "redberry-upload",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setImage(result.info.secure_url); // Update the image URL in the parent component
        }
      }
    );
  }, [setImageUrl]);

  useEffect(() => {
    if (image !== "" || image.length !== 0 || !!image) {
      setImageUrl(image);
    }
  }, [image, setImageUrl]);
  return (
    <button
      type="button"
      className="w-[800px] h-[120px] border-2 border-dotted border-primaryBlue-200 flex items-center justify-center rounded-lg"
      onClick={() => widgetRef.current.open()}
    >
      <img src="./images/plus.png" alt="file upload" />
    </button>
  );
}

export default UploadWidget;
