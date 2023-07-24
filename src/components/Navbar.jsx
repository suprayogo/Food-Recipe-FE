import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
function Navbar() {
  return (
    <div>
      <nav className="container mt-4">
        <div className="row animate__animated animate__fadeInDown">
          <div className="col-10">
            <div className="nav_link">
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending
                    ? "text-primary fw-medium text-decoration-none"
                    : isActive
                    ? "text-click text-decoration-none"
                    : " text-primary fw-medium text-decoration-none"
                }
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending
                    ? "text-primary fw-medium text-decoration-none mx-5"
                    : isActive
                    ? "text-click text-decoration-none mx-5"
                    : " text-primary fw-medium text-decoration-none mx-5"
                }
                to="/add-recipe"
              >
                Add Recipe
              </NavLink>
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending
                    ? "text-primary fw-medium text-decoration-none"
                    : isActive
                    ? "text-click text-decoration-none"
                    : " text-primary fw-medium text-decoration-none"
                }
                to={`/profile`}
              >
                Profile
              </NavLink>
            </div>
          </div>

          <div
            className="col nav_link_2"
            style={{
              zIndex: 1,
            }}
          >
            {localStorage.getItem("auth") ? (
              <>
                <Link
                  className="text-white  fw-medium text-decoration-none"
                  onClick={() => {
                    localStorage.clear();

                    window.location.href = "/login";
                  }}
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="mt-2 d-flex justify-content-between align-items-center hide-desktop">
        {/* <img src="/image/logo.png" width="70px" height="70px" /> */}
        <button
          className="btn"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          <img src="/image/menu.png" width="35px" height="35px" />
        </button>
      </div>
      <div className="collapse" id="collapseExample">
        {localStorage.getItem("auth") ? (
          <>
            <div className="card card-body nav_link">
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending
                    ? "text-primary fw-bold mb-3 text-decoration-none mt-3 text-center"
                    : isActive
                    ? "text-click fw-bold mb-3 text-decoration-none mt-3 text-center"
                    : " text-primary fw-bold mb-3 text-decoration-none mt-3 text-center"
                }
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending
                    ? "text-primary fw-bold mb-3 text-decoration-none mt-3 text-center"
                    : isActive
                    ? "text-click fw-bold mb-3 text-decoration-none mt-3 text-center"
                    : " text-primary fw-bold mb-3 text-decoration-none mt-3 text-center"
                }
                to="/add-recipe"
              >
                Add Recipe
              </NavLink>
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending
                    ? "text-primary fw-bold mb-3 text-decoration-none mt-3 text-center"
                    : isActive
                    ? "text-click fw-bold mb-3 text-decoration-none mt-3 text-center"
                    : " text-primary fw-bold mb-3 text-decoration-none mt-3 text-center"
                }
                to="/profile"
              >
                Profile
              </NavLink>
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending
                    ? "text-primary fw-bold mb-3 text-decoration-none mt-3 text-center"
                    : isActive
                    ? "text-click fw-bold mb-3 text-decoration-none mt-3 text-center"
                    : " text-primary fw-bold mb-3 text-decoration-none mt-3 text-center"
                }
                onClick={() => {
                  localStorage.clear();

                  window.location.href = "/login";
                }}
                to="/login"
              >
                Logout
              </NavLink>
            </div>
          </>
        ) : (
          <>
            <div className="card card-body nav_link">
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending
                    ? "text-primary fw-bold mb-3 text-decoration-none mt-3 text-center"
                    : isActive
                    ? "text-click fw-bold mb-3 text-decoration-none mt-3 text-center"
                    : " text-primary fw-bold mb-3 text-decoration-none mt-3 text-center"
                }
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending
                    ? "text-primary fw-bold mb-3 text-decoration-none mt-3 text-center"
                    : isActive
                    ? "text-click fw-bold mb-3 text-decoration-none mt-3 text-center"
                    : " text-primary fw-bold mb-3 text-decoration-none mt-3 text-center"
                }
                to="/add-recipe"
              >
                Add Recipe
              </NavLink>
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending
                    ? "text-primary fw-bold mb-3 text-decoration-none mt-3 text-center"
                    : isActive
                    ? "text-click fw-bold mb-3 text-decoration-none mt-3 text-center"
                    : " text-primary fw-bold mb-3 text-decoration-none mt-3 text-center"
                }
                to="/profile"
              >
                Profile
              </NavLink>
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending
                    ? "text-primary fw-bold mb-3 text-decoration-none mt-3 text-center"
                    : isActive
                    ? "text-click fw-bold mb-3 text-decoration-none mt-3 text-center"
                    : " text-primary fw-bold mb-3 text-decoration-none mt-3 text-center"
                }
                to="/login"
              >
                Login
              </NavLink>
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending
                    ? "text-primary fw-bold mb-3 text-decoration-none mt-3 text-center"
                    : isActive
                    ? "text-click fw-bold mb-3 text-decoration-none mt-3 text-center"
                    : " text-primary fw-bold mb-3 text-decoration-none mt-3 text-center"
                }
                to="/register"
              >
                Register
              </NavLink>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
