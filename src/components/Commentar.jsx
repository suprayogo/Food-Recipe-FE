import React from "react";
import "../styles/Detail.css";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

function Commentar() {
  const location = useLocation();
  const [comment, setComment] = React.useState([]);
  const id = location?.search?.split("?id=")[1];
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
console.log(id);
React.useEffect(() => {
  // Check if the user is logged in and set the isLoggedIn state accordingly
  const token = localStorage.getItem("auth");
  setIsLoggedIn(!!token); // !!token converts the token to a boolean value (true if token exists, false if not)

  // Fetch the comments if the user is logged in
  if (isLoggedIn) {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/recipes/${id}/comment`)
      .then((response) => setComment(response?.data?.comments))
      .catch((error) => {
        console.error("Error fetching comments:", error);
        setComment([]); // Set comment to an empty array if an error occurs or if the user is not logged in
      });
  }
}, [id, isLoggedIn]);

console.log(comment)
  return (
    <>
      <div className="row mt-4">
        <div className="col offset-md-2 ">
          <h2 className="mb-5">Comment</h2>
          <div style={{ overflow: "auto", maxHeight: "250px" }}>

         
          {isLoggedIn ? (
            comment.length > 0 ? (
              comment.map((comment) => (
            <div
              className="d-flex align-items-center mb-3"
              
              key={comment.id}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={comment.user_profilepicture}
                    width={50}
                    height={50}
                    alt="foto"
                    style={{ borderRadius: "50%", marginRight: "1rem" }}
                  />
                  <div>
                    <h6 style={{ margin: 0 }}>{comment.user_fullname}</h6>
                    <span style={{ fontSize: "14px" }}>{comment.commentar}</span>
                  </div>
                </div>
              </div>
            </div>
           
           ))
         ) : (
           <p>No comments available.</p>
         )
       ) : (


        <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src="/image/profil.png"
          width={50}
          height={50}
          alt="foto"
          style={{ borderRadius: "50%", marginRight: "1rem" }}
        />
        <div>
          <h6 style={{ margin: 0 }}>Admin</h6>
          <span style={{ fontSize: "14px" }}>You must login first to view comments</span>
        </div>
      </div>


       )}
        </div>
        </div>
      </div>
    </>
  );
}

export default Commentar;
