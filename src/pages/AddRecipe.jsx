import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Add.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
function Add() {
    return (
        <>
        
        <header>
<Navbar />
        </header>
        <section>
      <form action="" method="POST" enctype="multipart/form-data">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <div className="dropzone-wrapper">
                  <div className="dropzone-desc">
                    <p style={{fontWeight:"bold"}}>Add Photo</p>
                  </div>
                  <input type="file" name="img_logo" className="dropzone" />
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-12">
              <label for="exampleFormControlInput1" className="form-label"></label>
              <input
                type="title"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Title"
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-12">
              <label
                for="exampleFormControlTextarea1"
                className="form-label"
              ></label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="6"
                placeholder="Ingredients"
              ></textarea>
            </div>
          </div>

          <div className="row mt-4 mb-3">
            <div className="col-md-12">
              <label for="exampleFormControlInput1" className="form-label"></label>
              <input
                type="title"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Video"
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="parent">
              <button
                className="btn btn-warning d-grid gap-11 col-md-4"
                style={{color: "azure"}}
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
    )
}

export default Add
