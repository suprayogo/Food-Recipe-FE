import "../styles/Home.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RecipeCard from "../components/RecipeCard";
import recipeList from "../menu.json";

function App() {
  return (
    <div classNameName="App">
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
                  aria-label="Search"
                />
              </div>
            </div>
            <div className="col-md-5 col-xs-12 order-1 order-md-2">
              <img
                src="/img/home.png"
                width="400px"
                height="400px"
                style={{
                  zIndex: 1,
                }}
                className="animate__animated animate__fadeIn header-image"
              />
            </div>
          </div>
        </div>

        <div className="bg_yellow"></div>
      </header>
      {/* {Header of end} */}

      {/* <!-- pupular for u --> */}
      <section id="popular-for-u">
        <div className="container">
          <h2 className="mb-5 subtitle">Popular For You !</h2>
          <div
            className="row align-items-center"
            style={{ marginTop: "100px" }}
          >
            <div className="col-md-6 col-xs-12">
              <img
                src="/img/fench.png"
                width="500px"
                height="500px"
                style={{ zIndex: 1 }}
              />
            </div>
            <div className="col-md-5 col-xs-12">
              <h3>French Toast (Perancis)</h3>
              <hr style={{ width: "20%" }} />
              <p className="text-muted">
                Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen in
                a hurry? That’s right!
              </p>
              <button className="btn btn-warning">Learn More</button>
            </div>
          </div>
        </div>
        <div className="bg_yellow_3"></div>
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
              <img
                src="/img/fench.png"
                width="500px"
                height="500px"
                style={{ zIndex: 1 }}
              />
            </div>
            <div className="col-md-5 col-xs-12">
              <h3>Healthy Bone Broth Ramen (Quick & Easy)</h3>
              <hr style={{ width: "20%" }} />
              <p className="text-muted">
                Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen in
                a hurry? That’s right!
              </p>
              <button className="btn btn-warning">Learn More</button>
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

          <div className="row">
            {recipeList.menu.map((item) => (
              <RecipeCard title={item?.title} image={item?.image} />
            ))}

            {/* move to menu.json 
 < RecipeCard title= "Pumkin Cream Soup" image="pumpkin.png"/>
 < RecipeCard title= "Dumpling" image="dumpling.png" />
 < RecipeCard title= "Cream Banana" image="banana.png" />
 < RecipeCard title= "Coffe Lava Cake" image="cake.png" />
 < RecipeCard title= "Wild Alasaka Salmon" image="salmon.png" />
 < RecipeCard title= "India Salad" image="salad.png" />
 */}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;
