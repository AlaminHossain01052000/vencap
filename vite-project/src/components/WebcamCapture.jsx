import { useRef } from "react";
import Webcam from "react-webcam";

const WebcamCapture = (props) => {
  const { setCapturedImage, setImageFile, capturedImage, imageFile } = props || {}
  const webcamRef = useRef(null);

  const handleCapture = () => {
    if (webcamRef.current) {
      // Capture image using the webcam
      const imageData = webcamRef.current.getScreenshot();
      // Convert the captured base64 image to a JPG file
      const byteArray = new Uint8Array(atob(imageData.split(",")[1]).split("").map((c) => c.charCodeAt(0)));
      const file = new File([byteArray], "captured-image.jpg", { type: "image/jpeg" });
      setCapturedImage(file);
      setImageFile(imageData)
      // handleSubmit()
    }
  };
  
  return (
    <div className="mt-5">
      
        <div className="d-flex flex-column justify-content-center align-items-center">
        
          <Webcam
            audio={false}
            screenshotFormat="image/jpeg"
            width="600px"
           
            ref={webcamRef} // Pass the reference here
          />
          <button type="button" onClick={handleCapture} className="btn btn-primary mt-3 fw-bold">
          Capture Image
        </button>
        </div>
        
        {capturedImage && (
          <div className="mt-5 d-flex flex-column justify-content-center align-items-center">

            <h6>Captured Image</h6>
            <img
              src={imageFile}
              alt="Captured"
              style={{ width: "600px", height: "300px", objectFit: "cover" }}
            />

          </div>
        )}
    </div>

  );
};

export default WebcamCapture;