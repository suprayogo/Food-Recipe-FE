import React from "react";
import { Link } from "react-router-dom";


function RecipeCard(props) {
 const {title, image} = props;
 console.log(props)
  return (
<>

<div className="col-md-4 col-xs-12 mb-4">
            <Link to={`/detail/${title?.toLowerCase()?.split(" ")?.join("-")}`}>

            <div
              className="menu-background"
                 style={{backgroundImage: `url(/image/${image})`}}
            >
              <h3 style={{textShadow: "0px 0px 2px rgba(0, 0, 0, 0.4)"}}>
               {title}
              </h3>
            </div>
            </Link>
          </div>

</>
  );
}

export default RecipeCard;
