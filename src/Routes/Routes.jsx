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
import Error from "../Error/Error";
import AddNewSlot from "../Dashboard/Trainer/AddNewSlot";
import ManageSlot from "../Dashboard/Trainer/ManageSlot";
import NewForumPost from "../Dashboard/NewForumPost";
import Forum from "../componants/Forum/Forum";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error/>,
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
      },
      {
        path: "forum",
        element: <Forum/>
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
      },
      {
        path: "add-new-slot",
        element: <AddNewSlot/>
      },
      {
        path: "manage-slots",
        element: <ManageSlot/>
      },
      {
        path: "new-forum-post",
        element: <NewForumPost/>
      }
    ]
  }
]);

export default router;
