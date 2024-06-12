import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Register from "../componants/Register/Register";
import Login from "../componants/Login/Login";
import Home from "../componants/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login/>
      }
    ],
  },
]);

export default router;
