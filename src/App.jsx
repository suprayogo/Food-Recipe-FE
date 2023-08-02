
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Video from "./pages/Video";
import Register from "./pages/Register"
import Login from "./pages/Login";
import AddRecipe from "./pages/AddRecipe";
import Profile from "./pages/Profile";
import ForgetPassword from "./pages/ForgetPassword";
import store from './store'
import { Provider } from 'react-redux'
import axios from "axios";

const router =createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/detail/:id",
    element: <Detail />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/add-recipe",
    element: <AddRecipe />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/video/:id",
    element: <Video />,
  },
  {
    path: "/forgetpassword",
    element: <ForgetPassword />,
  },
]);

function App() {
axios.interceptors.request.use((config) => {
if(localStorage.getItem("token")){
  config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`
}
return config
}, (error) => {
  Promise.reject(error);
});


  return (
    <div className="App">
  
<Provider store={store}>
  <RouterProvider router={router} />
</Provider>












      
    </div>
  );
}

export default App;
