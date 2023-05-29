import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav className="container mt-4">
        <div className="row animate__animated animate__fadeInDown">
          <div className="col-10">
            <div className="nav_link">
              <Link
                className="text-click  fw-medium text-decoration-none"
                to="/"
              >
                Home
              </Link>
              <Link
                className="text-primary  fw-medium text-decoration-none mx-5"
                to="/add"
              >
                Add Recipe
              </Link>
              <Link
                className="text-primary  fw-medium text-decoration-none"
                to="/profile"
              >
                Profile
              </Link>
            </div>
          </div>
          <div
            className="col nav_link_2"
            style={{
              zIndex: 1,
            }}
          >
            <Link
              className="text-white me-5  fw-medium text-decoration-none"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="text-white  fw-medium text-decoration-none"
              to="/register"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      <div className="mt-2 d-flex justify-content-between align-items-center hide-desktop">
        <img src="/img/logo.png" width="70px" height="70px" />
        <button
          className="btn"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          <img src="/img/menu.png" width="35px" height="35px" />
        </button>
      </div>
      <div className="collapse" id="collapseExample">
        <div className="card card-body nav_link">
          <Link
            className="text-click fw-bold mb-3 text-decoration-none mt-3 text-center"
            to="/"
          >
            Home
          </Link>
          <Link
            className="text-primary  fw-medium text-decoration-none mb-3 text-center"
            to="/add"
          >
            Add Recipe
          </Link>
          <Link
            className="text-primary  fw-medium text-decoration-none mb-3 text-center"
            to="/profile"
          >
            Profile
          </Link>
          <Link
            className="text-primary  fw-medium text-decoration-none mb-3 text-center"
            to="/login"
          >
            Login
          </Link>
          <Link
            className="text-primary  fw-medium text-decoration-none mb-3 text-center"
            to="/register"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
