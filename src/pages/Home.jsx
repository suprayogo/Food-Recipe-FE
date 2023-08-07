import "../styles/Home.css";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RecipeCard from "../components/RecipeCard";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

function App() {
  const [recipeList, setRecipeList] = React.useState([]);
  const [keyword, setKeyword] = React.useState("");
  const [recipePopular, setRecipePopular] = React.useState([]);
  const [recipeNew, setRecipeNew] = React.useState([]);
  const [isDataFound, setIsDataFound] = React.useState(true);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_BASE_URL}/popular`)
      .then((response) => {
        setRecipePopular(response?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching popular recipes:", error);
        setLoading(false);
       console.log(error)
      });
  }, []);
  

  React.useEffect(() => {
    setLoading(true); 
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/recipes/?limit=9&pages=1&sortType=desc`
      )
      .then((response) => setRecipeList(response?.data?.data));
    setLoading(false);
  }, []);

  React.useEffect(() => {
    setLoading(true); 
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/recipes/?created=old`)
      .then((response) => setRecipeNew(response?.data?.data));
    setLoading(false);
  }, []);

  const handleSearch = () => {
    setLoading(true); 
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/recipes`, {
        params: {
          keyword,
          sortColumn: "title",
        },
      })
      .then((response) => {
        setLoading(false);
        setRecipeList(response?.data?.data);
        setIsDataFound(response?.data?.data?.length > 0);
      })
      .catch((error) => {
        setLoading(false);
        setIsDataFound(false);
        console.error("Error searching recipes:", error);
      });
  };
  return (
    <div className="App">
      <header>
        <Navbar />

        <div className="container">
          <div
            className="row align-items-center"
            style={{
              height: "90vh",
            }}
          >
            <div className="col-md-7 col-xs-12 order-2 order-md-1 animate__animated animate__fadeInLeft">
              <h1 className="text-primary">
                Discover Recipe & <br />
                Delicious Food
              </h1>

              <div className="mb-3 w-50 mt-3">
                <input
                  type="search"
                  id="form1"
                  className="form-control form-control-lg"
                  placeholder="Search restaurant, food"
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      window.location.href = "#popular-recipe";
                      handleSearch();
                    }
                  }}
                  aria-label="Search"
                />
              </div>
            </div>
            <div className="col-md-5 col-xs-12 order-1 order-md-2">
              {loading ? (
                <Skeleton width={400} height={400} />
              ) : (
                <img
                  src="/image/home.png"
                  alt="Hero"
                  width="400px"
                  height="400px"
                  className="animate__animated animate__fadeIn header-image"
                  style={{
                    zIndex: 1,
                  }}
                />
              )}
        <div className="bg_yellow"></div>
            </div>
          </div>
        </div>

      </header>
      {/* {Header of end} */}

      {/* <!-- pupular for u --> */}
      <section id="popular-for-u">
        <div className="container">
          <h2 className="mb-5 subtitle">Popular Recipe !</h2>
          <div
            className="row align-items-center"
            style={{ marginTop: "100px" }}
          >
            <Link
              style={{ textDecoration: "none" }}
              to={`/detail/${recipePopular[0]?.title
                ?.toLowerCase()
                ?.split(" ")
                ?.join("-")}?id=${recipePopular[0]?.id}`}
              className="col-md-6 col-xs-12"
            >
              {loading ? (
                <Skeleton width={400} height={400} /> // Use Skeleton component here
              ) : (
                <img
                  src={recipePopular[0]?.recipePicture}
                  alt="Recipe Popular"
                  width="500px"
                  height="500px"
                  style={{
                    zIndex: 1,
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                    borderRadius: "10px",
                    objectFit: "cover",
                  }}
                />
              )}
            </Link>
<div className="col-md-1"></div>
            <div className="col-md-5 col-xs-12">
              <h3>
                {recipePopular[0]?.title
                  ? recipePopular[0].title
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")
                  : ""}
              </h3>
              <hr style={{ width: "20%" }} />
              <p className="text-muted">
                A dish that brings an extraordinary sensation to the favorite
                and mainstay recipes, making it a dish that is liked and desired
                by many people
              </p>

              <Link
                style={{ textDecoration: "none" }}
                to={`/detail/${recipePopular[0]?.title
                  ?.toLowerCase()
                  ?.split(" ")
                  ?.join("-")}?id=${recipePopular[0]?.id}`}
                className="col-md-5 col-xs-12"
              >
                <button className="btn btn-warning">Detail</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- end of new recipe --> */}

      {/* <!-- start of new recipe --> */}
      <section id="new-recipe">
        <div className="container">
          <h2 className="mb-5 subtitle">New Recipe</h2>
          <div
            className="row align-items-center"
            style={{ marginTop: "100px" }}
          >
            <div className="col-md-6 col-xs-12">
              <Link
                style={{ textDecoration: "none" }}
                to={`/detail/${recipeNew[0]?.title
                  ?.toLowerCase()
                  ?.split(" ")
                  ?.join("-")}?id=${recipeNew[0]?.id}`}
                className="col-md-6 col-xs-12"
              >
                {loading ? (
                  <Skeleton width={400} height={400} /> 
                ) : (
                  <img
                    src={recipeNew[0]?.recipePicture}
                    width="500px"
                    height="500px"
                    style={{
                      zIndex: 1,
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                      borderRadius: "10px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </Link>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-5 col-xs-12">
              <h3>
                {" "}
                {recipeNew[0]?.title
                  ? recipeNew[0].title
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")
                  : ""}
              </h3>
              <hr style={{ width: "20%" }} />
              <p className="text-muted">
                Experience a new sensation with our latest recipe, featuring
                creative cuisine with flavors that tantalize the palate, making
                each bite a delightful indulgence!
              </p>

              <Link
                style={{ textDecoration: "none" }}
                to={`/detail/${recipeNew[0]?.title
                  ?.toLowerCase()
                  ?.split(" ")
                  ?.join("-")}?id=${recipeNew[0]?.id}`}
                className="col-md-6 col-xs-12"
              >
                <button className="btn btn-warning">Detail</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="bg_yellow_2"></div>
      </section>
      {/* <!-- end of new recipe --> */}

      {/* <!-- start of popular recipe --> */}

      <section id="popular-recipe">
        <div className="container  animate__animated animate__slideInUp">
          <h2 className="mb-5 subtitle">Popular Recipe</h2>

          {loading ? (
  <div className="row text-decoration-none">
    <div className="col-md-4 col-xs-12 mb-4">
      <Skeleton width={400} height={300} />
    </div>
    <div className="col-md-4 col-xs-12 mb-4">
      <Skeleton width={400} height={300} />
    </div>
    <div className="col-md-4 col-xs-12 mb-4">
      <Skeleton width={400} height={300} />
    </div>
  </div>
) : isDataFound ? (
  <div className="row text-decoration-none">
    {recipeList.map((item) => (
      <RecipeCard
        key={item?.id}
        title={item?.title}
        image={item?.recipePicture}
        id={item?.id}
      />
    ))}
  </div>
) : (
  <h2 className="text-muted d-flex justify-content-center align-items-center">
    Recipe Not Found
  </h2>
)}

        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;
