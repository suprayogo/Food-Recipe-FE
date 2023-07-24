import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Add.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
function Add() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [video_link, setVideoLink] = useState("");
  const [recipePicture, setRecipePicture] = useState("");
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const handleInputFocus = () => {
    setShowNotification(true);
  };
  const handleInputBlur = () => {
    setShowNotification(false);
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      if (!localStorage.getItem("auth")) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "You haven't logged in yet!",
          showCancelButton: true,
          confirmButtonText: "Go to Login",
          cancelButtonText: "Stay Here",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          } else {
            navigate("/");
          }
        });
      }
    };

    checkLoginStatus();
  }, []);



  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!title || !ingredients || !video_link || !recipePicture) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please complete all fields and upload an image",
        });
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("ingredients", ingredients);
      formData.append("video_link", video_link);
      formData.append("photo", recipePicture);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/recipes`,
        formData
      );

      console.log(response.data);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Recipe added successfully.",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.response?.data?.message || "Something went wrong",
      });
    }
  };


  




  return (
    <>
      <header>
        <Navbar />
      </header>
      <section>
        <form
          onSubmit={handleSubmit}
          method="POST"
          enctype="multipart/form-data"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  {recipePicture && (
                    <div>
                      <h2>Image Preview:</h2>
                      <img
                       src={URL.createObjectURL(recipePicture)}
                        alt="Selected"
                        style={{ width: "15%", height: "15%" }}
                      />
                    </div>
                  )}

                  <div className="dropzone-wrapper">
                    <div className="dropzone-desc">
                      <p style={{ fontWeight: "bold" }}>Add Photo</p>
                    </div>
                    <input
                      type="file"
                      name="img_logo"
                      className="dropzone"
                      onChange={(e) => setRecipePicture(e.target.files[0])}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-12">
                <label
                  for="exampleFormControlInput1"
                  className="form-label"
                ></label>
                <input
                  type="title"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>

            <div className="row mt-4 mb-3">
              <div className="col-md-12">
                <label
                  for="exampleFormControlTextarea1"
                  className="form-label"
                ></label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="6"
                  placeholder="Ingredients, NB: Each ingredient ends with a period (.) Example: 1 kg of salt."
                  onChange={(e) => setIngredients(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div>
              {showNotification && (
                <div className="alert alert-info mt-4" role="alert">
                  Copy the link from youtube and copy the id like the yellow
                  text : https://www.youtube.com/watch?v=
                  <span style={{ backgroundColor: "yellow" }}>3VjwogzQSD8</span>
                </div>
              )}

              <div className="row mb-3">
                <div className="col-md-12">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  ></label>
                  <input
                    type="title"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Video, Example: 3VjwogzQSD8"
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onChange={(e) => setVideoLink(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="parent">
                <button
                  className="btn btn-warning d-grid gap-11 col-md-4"
                  type="submit"
                  style={{ color: "azure" }}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>

      <Footer />
    </>
  );
}

export default Add;
