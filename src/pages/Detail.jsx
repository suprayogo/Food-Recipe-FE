import React from "react";
import "../styles/Detail.css";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Commentar from "../components/Commentar";
import axios from "axios";
import Swal from "sweetalert2";

import { FaRegThumbsUp } from "react-icons/fa";

function Detail(props) {
  const location = useLocation();
  const [currentRecipe, setCurrentRecipe] = React.useState(null);
  const [comment, setComment] = React.useState("");
  const id = location?.search?.split("?id=")[1];
  const [like, setLike] = React.useState(false);
  const [showNotification, setShowNotification] = React.useState(false);

  // handle scrolll to top
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/recipes/${id}`)
      .then((response) => setCurrentRecipe(response?.data?.data[0]));
  }, []);

  React.useEffect(() => {
    fetchLikeStatus();
  }, []);

  const fetchLikeStatus = async (token) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/recipes/${id}/status`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLike(response?.data?.isLiked);
    } catch (error) {
      console.error("Error fetching like status:", error);
    }
  };

const handleLikeClick = async (token) => {
  try {
    if (!token) {
      // If there's no token, show a login confirmation
      showLoginConfirmation();
      return;
    }

    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/recipes/${id}/like`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    setLike(!like);
    setLike(response.data.message === "Recipe liked successfully!");

    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  } catch (error) {
    if (error.response) {
      console.error("Error response from server:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error(
        "Error during request setup or response handling:",
        error.message
      );
    }
  }
};


  const iconStyle = {
    backgroundColor: like ? "#ffc107" : "white",
    color: like ? "white" : "#ffc107",
  };


 
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const token = localStorage.getItem("auth");
    if (!token) {
      // If there's no token, show a login confirmation
      showLoginConfirmation();
      return;
    }
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/recipes/${id}/comment`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log(response);
      Swal.fire({
        title: "Comment Added",
        text: "Your comment has been successfully added.",
        icon: "success",
      }).then(() => {
        // Refresh page
        window.location.reload();
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // If the response status is 401 (unauthorized), handle the error gracefully
        console.error("Error response from server:", error.response.data);
        // Show a user-friendly error message
        Swal.fire({
          title: "Unauthorized",
          text: "You must be logged in to perform this action.",
          icon: "warning",
        });
        // Redirect the user to the login page
        window.location.href = '/login';
      } else if (error.response) {
        // For other error responses, show the error message from the backend as a sweet alert
        console.error("Error response from server:", error.response.data);
        Swal.fire({
          title: "Error",
          text: error.response.data.message,
          icon: "error",
        });
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error(
          "Error during request setup or response handling:",
          error.message
        );
      }
    }
  };


  const showLoginConfirmation = () => {
    Swal.fire({
      title: 'You must be logged in .',
      showCancelButton: true,
      confirmButtonText: 'Login',
      cancelButtonText: 'Cancel',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/login'; 
      }
    });
  };


  return (
    <div>
      <header>
        <Navbar />
      </header>

      <section id="content">
        <div className="container">
          <h1 className="text-primary text-center">{currentRecipe?.title}</h1>

          <div className="d-flex justify-content-center position-relative">
            <img
              src={`${currentRecipe?.recipePicture}`}
              className="main-image"
              style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)" }}
            />

            <div className="icon">
              <div>
                {showNotification &&
                  (like ? (
                    <div
                      style={{
                        color: "white",
                        marginTop: "1rem",
                        marginBottom: "1.2rem",
                        textAlign: "center",
                        backgroundColor: "rgba(255, 0, 0, 0.8)",
                        borderRadius: "0.5rem",
                      }}
                    >
                      like
                    </div>
                  ) : (
                    <div
                      style={{
                        color: "white",
                        marginTop: "1rem",
                        marginBottom: "1.2rem",
                        textAlign: "center",
                        backgroundColor: "rgba(255, 0, 0, 0.8)",
                        borderRadius: "0.5rem",
                      }}
                    >
                      Unlike
                    </div>
                  ))}
              </div>
              <i
                className="icon-item  p-3 fs-5 rounded-3"
                style={iconStyle}
                onClick={handleLikeClick}
              >
                <FaRegThumbsUp />
              </i>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col offset-md-2">
              <h2>Ingredients</h2>
              <ul>
                {currentRecipe?.ingredients
                  .split(".")
                  .filter((sentence) => sentence !== "")
                  .map((sentence) => (
                    <li>{sentence}</li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col offset-md-2">
              <h2>Video Steps</h2>


              <div className="btn btn-warning d-grid gap-11 col-md-2">
                <Link to={`/video/${id}`}>
                  <img src="/image/vector.png" height="15px" width="15px" />
                </Link>
              </div>

              
            </div>
          </div>

          <div className="row mt-5 mb-5">
            <div className="col-md-8 offset-md-2">
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label
                    for="exampleFormControlTextarea1"
                    className="form-label"
                  ></label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="6"
                    value={comment} 
                    placeholder="Comment :"
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </div>
                <div className="parent">
                  <button
                   type="submit"
                    className="btn btn-warning d-grid gap-11 col-md-4"
                    style={{ color: "azure" }}
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>

          <Commentar />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Detail;
