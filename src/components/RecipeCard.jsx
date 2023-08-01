import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton"; // Import the Skeleton component
import "../styles/Home.css";

function RecipeCard(props) {
  const { title, image, id } = props;

  return (
    <>
      <div className="col-md-4 col-xs-12 mb-4  ">
        <Link
          style={{ textDecoration: "none" }}
          to={`/detail/${title?.toLowerCase()?.split(" ")?.join("-")}?id=${id}`}
        >
         
          {image ? (
            <div
              className="menu-background"
              style={{
                backgroundImage: `url(${image})`,
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                borderRadius: "10px",
              }}
            >
              <h3 className="my-custom-heading">{title}</h3>
            </div>
          ) : (
            <Skeleton width={400} height={300} />
          )}
        </Link>
      </div>
    </>
  );
}

export default RecipeCard;
