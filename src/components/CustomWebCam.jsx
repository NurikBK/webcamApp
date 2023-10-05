import { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import Webcam from 'react-webcam';
import CameraIcon from './CameraIcon';

const CustomWebcam = () => {
  const [mirrored, setMirrored] = useState(false);
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [watermarkedImgSrc, setWatermarkedImgSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);

    // Call a function to add watermark when capturing the image
    addWatermark(imageSrc);
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
    setWatermarkedImgSrc(null);
  };

  const addWatermark = (imageSrc) => {
    // Create a new Image object
    const image = new Image();
    image.src = imageSrc;

    // When the image is loaded, draw it on a canvas with the watermark
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');

      // Draw the image on the canvas
      ctx.drawImage(image, 0, 0);

      // Add a watermark text
      ctx.font = '20px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fillText('Your Watermark Here', 10, canvas.height - 10);

      // Convert the canvas to a data URL and set it as the watermarked image source
      const watermarkedImageSrc = canvas.toDataURL('image/jpeg');
      setWatermarkedImgSrc(watermarkedImageSrc);
    };
  };

  const videoConstraints = {
    facingMode: { exact: 'environment' },
  };

  const sendToServer = () => {
    if (watermarkedImgSrc) {
      // Create a FormData object to send the image
      const formData = new FormData();
      formData.append('image', watermarkedImgSrc);
      console.log(formData);
      // Make an HTTP POST request to your server
      // fetch('https://example.com/upload', {
      //   method: 'POST',
      //   body: formData,
      // })
      //   .then((response) => {
      //     // Handle the server response as needed
      //     if (response.ok) {
      //       // Image was successfully uploaded
      //       console.log('Image uploaded successfully.');
      //     } else {
      //       // Handle any errors
      //       console.error('Image upload failed.');
      //     }
      //   })
      //   .catch((error) => {
      //     console.error('Error sending the image:', error);
      //   });
    }
  };

  return (
    <div className="container">
      {watermarkedImgSrc ? (
        <div className="imageContainer">
          <img src={watermarkedImgSrc} alt="webcam" />
        </div>
      ) : (
        <Webcam
          height={300}
          width={300}
          ref={webcamRef}
          mirrored={mirrored}
          screenshotFormat="image/jpeg"
          screenshotQuality={1}
          // videoConstraints={videoConstraints}
        />
      )}
      <div className="btn-container">
        {watermarkedImgSrc ? (
          <>
            <button onClick={retake}>Переснять</button>
            <button onClick={sendToServer}>Отправить</button>
          </>
        ) : (
          <button onClick={capture}>Снять фото</button>
        )}
      </div>
    </div>
  );
};

export default CustomWebcam;
