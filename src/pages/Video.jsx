import React from 'react'
import SetVideo from '../components/setVideo';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
function Video() {
    const location=useLocation()
    const [video, setVideo] = React.useState(null);
const id = (location?.pathname.split("/")[2])
const idYt= (video?.video_link);
 


React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/recipes/${id}`)
    .then((response) => {
     setVideo(response?.data?.data[0])}
    )

},[])

    return (
        <>
<SetVideo />
<div className="embed-responsive embed-responsive-16by9">
  <iframe style={{height: "100%"}}  className="embed-responsive-item"
src={`https://www.youtube.com/embed/${idYt}`}
  
  allowfullscreen></iframe>
</div>
        </>
    )
}

export default Video
