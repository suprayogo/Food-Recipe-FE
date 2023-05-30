import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import "../styles/Profile.css"
function Profile() {
    return (
        <>
        
<header>
    <Navbar />

    
    <div class="container d-flex justify-content-center">
        <img
          src="./image/profil.png"
          class="img-responsive rounded-circle"
          height="150"
          width="150"
        />
      </div>
      <div class="d-flex justify-content-center mt-4">
        <h5>Rizki Suprayogo</h5>
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
            <div class="col-md-4 col-xs-12 mb-4">
              <div
                class="menu-background"
                style={{backgroundImage: `url('/image/pumpkin.png')`}}
              >
                <h3 style={{textShadow: "0px 0px 2px rgba(0, 0, 0, 0.4)"}}>
                  Pumpkin Cream Soup
                </h3>
              </div>
            </div>

            <div class="col-md-4 col-xs-12 mb-4">
              <div
                class="menu-background"
                style={{backgroundImage: `url('/image/dumpling.png')`}}
              >
                <h3 style={{textShadow: "0px 0px 2px rgba(0, 0, 0, 0.4)"}}>
                  Dumpling
                </h3>
              </div>
            </div>

            <div class="col-md-4 col-xs-12 mb-4">
              <div
                class="menu-background"
                style={{backgroundImage: `url('/image/banana.png')`}}
              >
                <h3 style={{textShadow: "0px 0px 2px rgba(0, 0, 0, 0.4)"}}>
                  Cream Banana
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


<Footer/>

        </>
    )
}

export default Profile
