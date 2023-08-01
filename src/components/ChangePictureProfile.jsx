import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

function ChangePictureProfile({ isOpen, onClose, }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSaveChanges = async () => {
    if (!selectedFile) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please upload an image",
      });
      return;
    }

    const formData = new FormData();
    formData.append("photo", selectedFile);

    try {
      Swal.showLoading();
      const res = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/profile/photo`,
        formData
      );

      setTimeout(() => {
        onClose();
        Swal.fire({
          title: "Upload Success",
          text: "Profile picture has been uploaded successfully!",
          icon: "success",
        });
      }, 1);
      window.location.reload();
    } catch (error) {
      console.error("File Upload Error:", error);
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "An error occurred while uploading the profile picture. Please try again later.",
      });
    }
  };

  return (
    <div
      className={`modal overlay  ${isOpen ? "show" : ""}`}
      style={{ display: isOpen ? "block" : "none" }}
    >
      <div
        className="modal-dialog"
        style={{
          boxShadow: isOpen ? "0px 0px 10px rgba(0, 0, 0, 0.3)" : "none",
          borderRadius: isOpen ? "10px" : "0",
        }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Change Profile Picture</h1>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            {/* Input element for file selection */}
            <label
              style={{
                border: selectedFile ? "none" : "2px dashed #91b0b3",
                color: "#92b0b3",
                position: "relative",
                height: selectedFile ? "400px" : "25vh",
                width: "100%",
                maxWidth: "600px",
                margin: "0 auto",

                fontSize: "16px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              {selectedFile ? (
                <>
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "400px",
                      overflow: "hidden",
                      margin: "0 auto",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Image Preview"
                      title={selectedFile.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                  </div>
                  <div style={{ marginTop: "1rem" }}>
                    Click image to change image
                  </div>
                </>
              ) : (
                <div>Add Foto</div>
              )}
            </label>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-warning"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePictureProfile;
