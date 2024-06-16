import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContexts";
import Skeleton from "react-loading-skeleton";

const DashboardLayout = () => {
  
  const { role, userLoading } = useContext(AuthContext);

  if (userLoading) {
    return (
      <div className="flex gap-2">
        <Skeleton width={"300px"} className="min-h-[90vh]" />
        <Skeleton width={"600px"} className="min-h-[90vh]" />
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <div className="bg-gray-600 min-h-[100vh] w-fit text-gray-200">
        <h2 className="text-2xl text-center mt-2">FitNova</h2>
        <ul className="*:px-10 *:py-2 *:border hover:*:bg-gray-700 text-xl pt-10 px-10 space-y-2 *:rounded">
          {role === "Admin" && (
            <>
              <li>
                <Link to="/dashboard">Newslatter</Link>
              </li>
              <li>
                <Link to="/dashboard/all-treainer">All Trainers</Link>
              </li>
              <li>
                <Link to="/dashboard/applied-trainers">Applied Trainer</Link>
              </li>
              <li>
                <Link to="/dashboard/add-class">Add New Class</Link>
              </li>
              <li>Balance</li>
              <li>
                <Link to="/dashboard/new-forum-post">Add new Forum</Link>
              </li>
            </>
          )}
          {role === "User" && (
            <>
              <li>
                <Link to="/dashboard/profile">Profile</Link>
              </li>
              <li>
                <Link to="/dashboard/be-a-trainer">Be a Trainer</Link>
              </li>
              <li>
                <Link to="/dashboard/activity-logs">Activity Logs</Link>
              </li>
            </>
          )}
          {role === "Trainer" && (
            <>
              <li>
                <Link to="/dashboard/manage-slots">Manage Slots</Link>
              </li>
              <li>
                <Link to="/dashboard/add-new-slot">Add New Slot</Link>
              </li>
              <li>
                <Link to="/dashboard/new-forum-post">Add new Forum</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
