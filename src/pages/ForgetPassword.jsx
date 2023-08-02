import React, { useState } from "react";

import { Link } from "react-router-dom";

function ForgetPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitting form...");
  };

  return (
    <div
      className="container forget-password-container "
      style={{ marginTop: "25vh" }}
    >
      <div className="row justify-content-center">
        <div className="col-md-4 col-xs-12">
          <h1 className="text-center text-warning">Forget Password</h1>
          <p className="text-center">
            Enter your email address to reset your password
          </p>
          <hr />

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                E-mail
              </label>
              <input
                type="email"
                className="form-control form-control-lg"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-warning btn-lg">
                Reset Password
              </button>
            </div>
          </form>

          <hr />

          <small className="d-block text-center text-muted">
            Remember your password?
            <Link className="text-warning text-decoration-none" to="/login">
              &nbsp; Log In
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
