import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Profile.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import Video from "./Video";
import Swal from "sweetalert2";

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = React.useState([]);
  const [recipeList, setRecipeList] = React.useState([]);

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
            }else{
              navigate("/")
            }
          });
          return;
        }

        // If token is present, fetch the profile data
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/token`);
        setProfile(response?.data?.data);

        // Fetch recipe list data
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/recipes/profile/me`);
        setRecipeList(result.data?.data);
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

        <div class="container d-flex justify-content-center">
          <img
            src={profile?.profilePicture}
            class="img-responsive rounded-circle"
            height="150"
            width="150"
          />
        </div>
        <div class="d-flex justify-content-center mt-4">
          <h5>{profile?.fullname}</h5>
          <hr />
        </div>
      </header>

      <section id="card-list-3" class="pad">
        <div class="container card text-center mt-5">
          <div class="card-header">
            <ul class="nav nav-pills card-header-pills">
              <li class="nav-item">
                <a class="nav-link text-black fw-bold" href="#">
                  My Recipe
                </a>
              </li>

              <li class="nav-item">
                <a class="nav-link text-gray fw-bold" href="#">
                  Saved Recipe
                </a>
              </li>

              <li class="nav-item">
                <a class="nav-link text-gray fw-bold" href="#">
                  Liked Recipe
                </a>
              </li>
            </ul>
          </div>

          <div class="card-body">
            <div class="row">
              {recipeList.map((item) => (
                <RecipeCard
                  title={item?.title}
                  image={item?.recipePicture}
                  id={item?.id}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Profile;
