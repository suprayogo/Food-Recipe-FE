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

  console.log(recipePicture);

  useEffect(() => {
    const checkLoginStatus = () => {
      if (!localStorage.getItem("auth")) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "You haven't logged in yet!",
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
      Swal.showLoading();
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

      <section style={{ padding: 0, margin: 0 }}>
        <form
          onSubmit={handleSubmit}
          method="POST"
          enctype="multipart/form-data"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label
                    style={{
                      border: recipePicture ? "none" : "2px dashed #91b0b3",
                      color: "#92b0b3",
                      position: "relative",
                      height: recipePicture ? "400px" : "25vh",
                      width: "100%",
                      maxWidth: "600px",
                      margin: "0 auto",
                      top: "50px",
                      fontSize: "16px",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setRecipePicture(e.target.files[0])}
                      style={{ display: "none" }}
                    />
                    {recipePicture ? (
                      <>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "400px",
                            overflow: "hidden",
                            margin: "0 auto",
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                          }}
                        >
                          <img
                            src={URL.createObjectURL(recipePicture)}
                            alt="Image Preview"
                            title={recipePicture.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                          />
                        </div>
                        <div style={{ marginTop: "1rem" }}>
                          Click image to change image
                        </div>
                      </>
                    ) : (
                      <div>Add Foto</div>
                    )}
                  </label>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-12 d-flex justify-content-center">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                ></label>
                <input
                  type="title"
                  className="form-control mt-5"
                  id="exampleFormControlInput1"
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ width: "100%", maxWidth: "600px" }}
                />
              </div>
            </div>

            <div className="row mt-4 mb-3">
              <div className="col-md-12 d-flex justify-content-center">
                <label
                  for="exampleFormControlTextarea1"
                  className="form-label"
                ></label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="6"
                  placeholder={`Ingredients, NB: end the sentence with a period (.)\nExample:\n1 kg of salt.\n1 ons sugar.\n5 ons chicken.`}
                  onChange={(e) => setIngredients(e.target.value)}
                  style={{ width: "100%", maxWidth: "600px" }}
                ></textarea>
              </div>
            </div>

            <div>
              {showNotification && (
                <div className="col-md-12 d-flex justify-content-center">
                  <div className=" alert alert-info mt-4 " role="alert">
                    Copy the link from youtube and copy the id like the yellow
                    text : https://www.youtube.com/watch?v=
                    <span style={{ backgroundColor: "yellow" }}>
                      3VjwogzQSD8
                    </span>
                  </div>
                </div>
              )}

              <div className="row mb-3">
                <div className="col-md-12 d-flex justify-content-center">
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
                    style={{ width: "100%", maxWidth: "600px" }}
                  />
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="parent">
                <button
                  className="btn btn-warning d-grid gap-11 col-md-4"
                  type="submit"
                  style={{ color: "azure", width: "100%", maxWidth: "100px" }}
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
