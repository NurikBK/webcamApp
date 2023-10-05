import { useState } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import Webcam from "react-webcam";
import CameraIcon from "./CameraIcon";

const CustomWebcam = () => {
  const [mirrored, setMirrored] = useState(false);
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);
  const retake = () => {
    setImgSrc(null);
  };
  const videoConstraints = {
      facingMode: { exact: "environment" }
    };
  return (
    <div className="container">
    {imgSrc ? (
      <img src={imgSrc} alt="webcam" />
    ) : (
      <Webcam
          height={400}
          width={300}
          ref={webcamRef}
          mirrored={mirrored}
          screenshotFormat="image/jpeg"
          screenshotQuality={1}
          videoConstraints={videoConstraints}
        />
    )}
    <div className="btn-container">
      {imgSrc ? (
        <button onClick={retake}>Переснять</button>
      ) : (
        <button onClick={capture}>Снять фото</button>
      )}
    </div>
  </div>
  );
};

export default CustomWebcam;
