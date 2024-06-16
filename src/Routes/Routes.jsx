import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Register from "../componants/Register/Register";
import Login from "../componants/Login/Login";
import Home from "../componants/Home/Home";
import DashboardLayout from "../Dashboard/DashboardLayout/DashboardLayout";
import Newslatter from "../Dashboard/Admin/Newslatter";
import AllTrainer from "../Dashboard/Admin/AllTrainer";
import BeATrainer from "../Dashboard/User/BeATrainer";
import AppliedTrainers from "../Dashboard/Admin/AppliedTrainers";
import AddNewClass from "../Dashboard/Admin/AddNewClass";
import ActivityLogs from "../Dashboard/User/ActivityLogs";
import AppliedTrainerDetails from "../Dashboard/Admin/AppliedTrainerDetails";
import Profile from "../Dashboard/User/Profile";
import UpdateProfile from "../Dashboard/User/UpdateProfile";

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
  {
    path: "dashboard",
    element: <DashboardLayout/>,
    children: [
      {
        index: true,
        element: <Newslatter/>
      },
      {
        path: "all-treainer",
        element: <AllTrainer/>
      },
      {
        path: "add-class",
        element: <AddNewClass/>
      },
      {
        path: "applied-trainers",
        element: <AppliedTrainers/>,
      },
      {
        path: "applied-trainers/:id",
        element: <AppliedTrainerDetails/>

      },
      {
        path: "be-a-trainer",
        element: <BeATrainer/>
      },
      {
        path: "activity-logs",
        element: <ActivityLogs/>
      },
      {
        path: "profile",
        element: <Profile/>
      },
      {
        path: "profile/update",
        element: <UpdateProfile/>
      }
    ]
  }
]);

export default router;
