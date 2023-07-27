import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';


function Register() {
  const [isChecked, setIsChecked] = React.useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [fullname, setFullname] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const handlePasswordToggle = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleRegister = () => {
    if (!isChecked) {
      Swal.fire({
        title: 'Agree to Terms',
        text: 'Please agree to the terms & conditions to log in.',
        icon: 'warning',
      });
      return;
    }
       Swal.showLoading();
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/register`, {
        email: email,
        fullname: fullname,
        phoneNumber: phoneNumber,
        password: password,
      })
      .then(() => {
        Swal.fire({
          title: "Register Success",
          text: "Register Success, Redirect In App",
          icon: "success",
        }).then(() => {
          navigate("/login");
        });
      })
      .catch((error) => {
        console.error("Error registering:", error);

        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          const errorMessage = error.response.data.message;
          Swal.fire({
            title: "Register Error",
            text: errorMessage,
            icon: "error",
          });
        } else {
          Swal.fire({
            title: "Register Error",
            text: "An error occurred during registration. Please try again later.",
            icon: "error",
          });
        }
      });
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-md-4 col-xs-12">
            <h1 className="text-center text-warning">Let’s Get Started !</h1>
            <p className="text-center">
              Create new account to access all features
            </p>
            <hr />

            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <div className="mb-3">
                <label for="exampleInputName" className="form-label">
                  Name
                </label>
                <input
                  type="Name"
                  className="form-control form-control-lg"
                  id="name"
                  placeholder="Enter Your Name"
                  required
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Email address*
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Email address"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputPhone" className="form-label">
                  Phone Number
                </label>
                <input
                  type="PhoneNumber"
                  className="form-control form-control-lg"
                  id="exampleInputPhoneNumber"
                  placeholder="08xxxxxxxxxx"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Create Password
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control form-control-lg"
                    id="exampleInputPassword1"
                    aria-describedby="emailHelp"
                    placeholder="Create Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    className="btn btn-outline-warning"
                    type="button"
                    onClick={handlePasswordToggle}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <label className="form-check-label" for="exampleCheck1">
                  I agree to terms & conditions
                </label>
              </div>




              <div className="d-grid mb-3">
                <button
                  type="submit"
                  className="btn btn-warning btn-lg"
                  onClick={handleRegister}
                  disabled={!isChecked}
                >
                  Register
                </button>
              </div>
            </form>

            <small className="d-block text-center text-muted">
              Already have account?
              <Link
                className="text-warning text-decoration-none mb-3"
                to="/login"
              >
                Log in Here
              </Link>
            </small>
          </div>
          <hr />
        </div>
      </div>
    </>
  );
}

export default Register;
