import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import "../styles/Profile.scss"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';
import Video from './Video';


function Profile() {
const navigate = useNavigate();
const [profile, setProfile] = React.useState([])
const [recipeList, setRecipeList] = React.useState([])





React.useEffect(() =>{
  if(!localStorage.getItem("auth")){
    navigate("/login");
}
}, [])

React.useEffect(() => {
  axios.get(`${process.env.REACT_APP_BASE_URL}/profile`)
  .then((response) => {
    setProfile(response?.data?.data[0])
  })
  
  axios.get(`${process.env.REACT_APP_BASE_URL}/recipes/profile/me`)
  .then((result) => {
    setRecipeList(result.data?.data)
  })
  
  
}, [])




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
              <a class="nav-link text-black fw-bold" href="#">My Recipe</a>
            </li>

            <li class="nav-item">
              <a class="nav-link text-gray fw-bold" href="#">Saved Recipe</a>
            </li>

            <li class="nav-item">
              <a class="nav-link text-gray fw-bold" href="#">Liked Recipe</a>
            </li>
          </ul>
        </div>

        <div class="card-body">
          <div class="row">
{recipeList.map((item) =>(
   <RecipeCard title={item?.title} image={item?.recipePicture} 
   id={item?.id} />
))}
        
  
          </div>
        </div>
      </div>
    </section>


<Footer/>

        </>
    )
}

export default Profile
