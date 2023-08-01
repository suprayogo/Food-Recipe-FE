import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function EditProfileModal({ isOpen, onClose, profile }) {
  const [fullname, setFullname] = React.useState(profile?.fullname || "");
  const [email, setEmail] = React.useState(profile?.email || "");
  const [phoneNumber, setPhoneNumber] = React.useState(
    profile?.phoneNumber || ""
  );
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const handlePasswordToggle = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  console.log(isOpen);

  const handleSaveChanges = async () => {
    try {
      const dataToUpdate = {
        fullname: fullname,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
      };

      await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/profile`,
        dataToUpdate
      );

      Swal.fire({
        title: "Success!",
        text: "Profile has been updated.",
        icon: "success",
      });

      onClose();
      window.location.reload();
    } catch (error) {
      Swal.fire({
        title: "Login Failed",
        text: error?.response?.data?.message ?? "Something wrong in our app",
        icon: "error",
      });

      console.error("Error updating profile:", error);
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
            <h1 className="modal-title fs-5">Edit Profile</h1>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="fullname">Fullname</label>
              <input
                type="text"
                id="fullname"
                className="form-control text-muted"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
            <div className="form-group ">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control text-muted"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                className="form-control text-muted"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="form-control text-muted "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="change password if you want"
                />
                <button
                  className="btn btn-outline-warning"
                  type="button"
                  onClick={handlePasswordToggle}
                  style={{
                    position: "absolute",
                    right: "1px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
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

export default EditProfileModal;
