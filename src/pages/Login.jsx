import React from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {addAuth} from "../reducers/auth"
import { FaEye, FaEyeSlash } from 'react-icons/fa';


function Login() {
  const [isChecked, setIsChecked] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const state = useSelector((reducer) => reducer.auth);
  const [showPassword, setShowPassword] = React.useState(false);
  const handlePasswordToggle = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };




React.useEffect(() => {
  if (localStorage.getItem("auth") || state.auth){
    navigate("/profile");
  }
}, [state]);



const handleLogin = () => {
  if (!isChecked) {
    Swal.fire({
      title: 'Agree to Terms',
      text: 'Please agree to the terms & conditions to log in.',
      icon: 'warning',
    });
    return;
  }

  axios
    .post(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
      email: email,
      password: password,
    })
    .then((result) => {
      Swal.fire({
        title: 'Login Success',
        text: 'Login Success, Redirect In App',
        icon: 'success',
      }).then(() => {
        localStorage.setItem('auth', 'true');
        localStorage.setItem('token', result?.data?.token);
        dispatch(addAuth(result));
        navigate('/profile');
      });
    })
    .catch((error) => {
      Swal.fire({
        title: 'Login Failed',
        text: error?.response?.data?.message ?? 'Something wrong in our app',
        icon: 'error',
      });
    });
  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-md-4 col-xs-12">
            <h1 className="text-center text-warning">Welcome</h1>
            <p className="text-center">Log in into your exiting account</p>
            <hr />

            <form onSubmit={(event) => {
              event.preventDefault();
            }}>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  E-mail
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>


              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <div className="input-group">
                <input
                 type={showPassword ? "text" : "password"}
                  className="form-control form-control-lg"
                  id="exampleInputPassword1"
                  placeholder="Password"
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
              <div className="d-grid">
                <button type="submit" disabled={!isChecked} className="btn btn-warning btn-lg" onClick={handleLogin}>
                  Log in
                </button>
              </div>
            </form>

            <small>
              <Link
                to="/forget.html"
                className="d-block text-decoration-none text-muted text-right mt-3"
              >
                Forgot Password
              </Link>
            </small>
            <hr />

            <small className="d-block text-center text-muted">
              Don’t have an account?
              <Link
                className="text-warning text-decoration-none"
                to="/register"
              >
                Sign Up
              </Link>
            </small>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
