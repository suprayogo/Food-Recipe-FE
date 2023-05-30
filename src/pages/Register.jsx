import React from "react";
import { Link } from "react-router-dom";

function Register() {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-md-4 col-xs-12">
            <h1 className="text-center text-warning">Let’s Get Started !</h1>
            <p className="text-center">Create new account to access all features</p>
            <hr />

            <form>
              <div className="mb-3">
                <label for="exampleInputName" className="form-label">
                  Name
                </label>
                <input
                  type="Name"
                  className="form-control form-control-lg"
                  id="name"
                  placeholder="Enter Your Name"
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
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  Create New Password
                </label>
                <input
                  type="password1"
                  className="form-control form-control-lg"
                  id="exampleInputPassword1"
                  aria-describedby="emailHelp"
                  placeholder="Create New Password"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword2" className="form-label">
                  New Password
                </label>
                <input
                  type="password2"
                  className="form-control form-control-lg"
                  id="exampleInputPassword2"
                  placeholder="New Password"
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" for="exampleCheck1">
                  I agree to terms & conditions
                </label>
              </div>
              <div className="d-grid mb-3">
                <button type="submit" className="btn btn-warning btn-lg">
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
