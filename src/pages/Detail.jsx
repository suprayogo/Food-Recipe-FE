import React from "react";
import "../styles/Detail.css";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

function Detail(props) {
 
  const location = useLocation();
  const [currentRecipe, setCurrentRecipe] = React.useState(null);
  const id = location?.search?.split("?id=")[1];

  
  // handle scrolll to top
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  React.useEffect(()=> {
    axios
    .get(`${process.env.REACT_APP_BASE_URL}/recipes/${id}`)
    .then((response) => setCurrentRecipe(response?.data?.data[0]));
  }, [])



  return (
    <div>
      <header>
        <Navbar />
      </header>

      <section id="content">
        <div className="container">
          <h1 className="text-primary text-center">{currentRecipe?.title}</h1>
          <div className="d-flex justify-content-center">
            <img
              src={`${currentRecipe?.recipePicture}`}
              className="main-image"
            />
          </div>
          <div className="row mt-4">
            <div className="col offset-md-2">
              <h2>Ingredients</h2>
              <ul>
              {currentRecipe?.ingredients.split('.').filter((sentence) => sentence
              !== '').map((sentence) =>(
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

          <div className="row mt-5">
            <div className="col-md-8 offset-md-2">
              <div className="mb-5">
                <label
                  for="exampleFormControlTextarea1"
                  className="form-label"
                ></label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="6"
                  placeholder="Comment :"
                ></textarea>
              </div>
              <div className="parent">
                <button
                  className="btn btn-warning d-grid gap-11 col-md-4"
                  style={{ color: "azure" }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Detail;
