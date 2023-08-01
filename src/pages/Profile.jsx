import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Profile.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import Video from "./Video";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import EditProfileModal from "../components/EditProfileModal";
import ChangePictureProfile from "../components/ChangePictureProfile";

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = React.useState([]);
  const [recipeList, setRecipeList] = React.useState([]);
  const [recipeLike, setRecipeLike] = React.useState([]);
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [isEditModalProfile, setEditModalProfile] = React.useState(false);
  const [isModalChangePicture, setModalChangePicture] = React.useState(false);
  const [active, setActive] = React.useState(true);

  const handleTabClick = (event) => {
    event.preventDefault();
    const linkId = event.target.id;

    // Set state berdasarkan tautan yang diklik
    setActive(linkId === "link-active");
  };

  const handleEditClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleEditProfile = () => {
    setEditModalProfile(!isEditModalProfile);
  };

  const handleChangePicture = () => {
    setModalChangePicture(!isModalChangePicture);
  };

  React.useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem("auth");
        if (!token) {
          // Show a notification using SweetAlert when not logged in
          Swal.fire({
            title: "Oops...",
            text: "You haven't logged in yet!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Go to Login",
            cancelButtonText: "Cancel",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/login");
            } else {
              navigate("/");
            }
          });
          return;
        }

        // If token is present, fetch the profile data
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/token`
        );
        setProfile(response?.data?.data);

        // Fetch recipe list data
        const result = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/recipes/profile/me`
        );
        setRecipeList(result.data?.data);

        // Fetch recipe like data
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/recipes/profile/like`
        );
        setRecipeLike(res?.data?.likedRecipes);
      } catch (error) {
        // Handle errors here
        console.error("API Error:", error);
      }
    };

    checkAuthentication();
  }, [navigate]);

  return (
    <>
      <header>
        <Navbar />

        <div className="container d-flex justify-content-center">
          <div className="position-relative">
            <img
              src={profile?.profilePicture}
              className="img-responsive rounded-circle"
              height="150"
              width="150"
              alt="Profile"
              style={{objectFit: "cover"}}
            />
            <span className="position-absolute bottom-0 start-5 translate-middle-x">
              <FontAwesomeIcon
                icon={faPencilAlt}
                className={`edit-icon ${isMenuOpen ? "open" : ""}`}
                onClick={handleEditClick}
                style={{
                  fontSize: "1.5rem",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  padding: "5px",
                  color: "#efc81ab0",
                  cursor: "pointer",
                }}
              />
            </span>
          </div>
        </div>

        <div class="d-flex justify-content-center mt-4">
          <h5>{profile?.fullname}</h5>
          <hr />
        </div>
        {isMenuOpen && (
          <div className="edit-menu  mt-2 d-flex justify-content-center align-items-center  bg-white rounded">
            <button
              className="btn btn-secondary d-block me-1 "
              onClick={handleEditProfile}
            >
              Edit Profile
            </button>

            <button
              className="btn btn-secondary d-block ms-1"
              onClick={handleChangePicture}
            >
              Change Picture
            </button>
          </div>
        )}

        {isEditModalProfile && (
          <EditProfileModal
            isOpen={isEditModalProfile}
            onClose={handleEditProfile}
            profile={profile}
          />
        )}

        {isModalChangePicture && (
          <ChangePictureProfile
            isOpen={isModalChangePicture}
            onClose={handleChangePicture}
            profile={profile}
          />
        )}
      </header>

      <section id="card-list-3" class="pad">
        <div className="container mt-4">
          <div className="card text-center">
            <div
              className="card-header"
              style={{ backgroundColor: "#efc81ab0" }}
            >
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <a
                    className={`nav-link ${active ? "active" : ""}`}
                    aria-current="true"
                    id="link-active"
                    onClick={handleTabClick}
                  >
                    My Recipe
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${!active ? "active" : ""}`}
                    id="link"
                    onClick={handleTabClick}
                  >
                    Like Recipe
                  </a>
                </li>
              </ul>
            </div>
            <div className="card-body" id="card-body">
              {active ? (
                <div class="row">
                  {recipeList.map((item) => (
                    <RecipeCard
                      title={item?.title}
                      image={item?.recipePicture}
                      id={item?.id}
                    />
                  ))}
                </div>
              ) : (
                <div class="row">
                  {recipeLike.map((item) => (
                    <RecipeCard
                      title={item?.title}
                      image={item?.recipePicture}
                      id={item?.id_recipe}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Profile;


