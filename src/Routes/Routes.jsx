import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Register from "../componants/Register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <div>Hi</div>,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
