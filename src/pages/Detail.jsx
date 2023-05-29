import React from "react";
import "../styles/Detail.css";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import recipeList from "../menu.json";
function Detail() {
 const detail = recipeList.menu;
 const location = useLocation();
 const [currentRecipe, setCurrentRecipe] = React.useState(null)
 React.useEffect(() => {
  const currentSlug = location?.pathname?.split("/")[2];

  window.scrollTo(0, 0);
  setCurrentRecipe(detail.find((res) => res.slug === currentSlug))
 }, []);



  return (
    <div>

    <Navbar />
      <header>
    <div className="bg_yellow"></div>
      </header>
    


      <section id="content">
      <div className="container">
        <h1 className="text-primary text-center">{currentRecipe?.title}</h1>
        <div className="d-flex justify-content-center">
          <img src={`/image/${currentRecipe?.image}`} className="main-image" />
        </div>
        <div className="row mt-4">
          <div className="col offset-md-2">
            <h2>Ingredients</h2>
            <ul>
              <li>2 eggs</li>
              <li>2 tbsp mayonnaise</li>
              <li>3 slices bread</li>
              <li>a little butter</li>
              <li>⅓ carton of cress</li>
              <li>
                2-3 slices of tomato or a lettuce leaf and a slice of ham or
                cheese
              </li>
              <li>crisps , to serve</li>
            </ul>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col offset-md-2">
            <h2>Video Steps</h2>
            <div className="btn btn-warning d-grid gap-11 col-md-2">
              <a href="">
                <img src="/image/vector.png" height="15px" width="15px" />
              </a>
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
                style={{color: "azure"}}
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
