/* eslint-disable no-undef */
import  { useState } from "react";

import WebcamCapture from "./WebcamCapture";
import useAuth from "../hooks/useAuth";

function UserVerification() {
  const [pdfFile, setPdfFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
const [error,setError]=useState('');
const {user}=useAuth();
// console.log(user)
  // Reference to the Webcam component

  const handlePdfChange = (e) => {
    setPdfFile(e.target.files[0]);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure both files are selected
    if (!pdfFile || !capturedImage) {
      alert("Please select both a PDF and capture an image.");
      return;
    }

    // Create FormData object to send files
    const formData = new FormData();
    formData.append("pdf_file", pdfFile);
    formData.append("image_file", capturedImage);

    try {
      // Send POST request to Flask server
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });
      console.log(error)
      // Handle response
      const result = await response.json();
      if (response.ok) {
        alert("Files uploaded successfully");
        setImageFile(null)
        setCapturedImage(null)
        // setPdfFile(null)
        // console.log(result,typeof(result.result))
        if(typeof(result.result)==='boolean'){
          const returnedResult=result.result;
            if(returnedResult){
              try {
                const response = await fetch('http://localhost:5001/user/updateUserVerified', {
                    method: 'POST', // Use POST method
                    headers: {
                        'Content-Type': 'application/json', // Send JSON data
                    },
                    body: JSON.stringify({
                        userEmail:user.email,
                        
                    }), // Send user email and interests as JSON
                });
        
                if (!response.ok) {
                    throw new Error('Failed to update user');
                }
        
                // const data = await response.json(); // Parse the JSON response
                alert("User Verified Successfully");
                // console.log('User updated successfully:', data);
                
            } catch (error) {
              setError(error);
                console.error('Error updating user:', error);
            }
          }
        }
        else{
          setError(result.result);
          aletrt(result.result);

        }
      } else {
        alert("Error uploading files");
        console.log(result);
      }
    } catch (error) {
      alert("An error occurred while uploading files.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-center">User Verification</h2>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="fs-6 fw-bold">Upload Your Nid File(PDF Format): </label>
            <input className="ms-2" type="file" accept=".pdf" onChange={handlePdfChange} />
          </div>
      <WebcamCapture 
        imageFile={imageFile} 
        capturedImage={capturedImage} 
        setCapturedImage={setCapturedImage} 
        setImageFile={setImageFile}
      />
        
        <div>

        </div>
          <div className="d-flex flex-row justify-content-center align-items-center">
          <button type="submit" className="mt-5 btn btn-warning fw-bold">Upload</button>
          </div>
           
        </form>
      </div>
      
    </div>
  );
}

export default UserVerification;
