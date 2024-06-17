import { useContext, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { AuthContext } from "../Contexts/AuthContexts";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenu, setIsMenu] = useState(false);
  const { user, userLoading, signOutUser } = useContext(AuthContext);

  const lists = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>Trainer</li>
      <li>All Classes</li>
      <li><Link to="/forum">Forum</Link></li>
      {user.email && <li><Link to="/dashboard">Dashboard</Link></li>}
    </>
  );

  if (userLoading) {
    return;
  }

  return (
    <div className="max-w-screen-2xl mx-auto mt-4">
      <div className="flex justify-between items-center">
        <Link to={"/"}>
          <img src="/logo.png" alt="" className="h-16" />
        </Link>
        <ul className="hidden md:flex items-center justify-center gap-4 font-semibold hover:*:text-sky-500 hover:*:duration-200 *:cursor-pointer">
          {lists}
        </ul>
        <div className="flex items-center gap-1">
          {user.email && (
            <Link to="/dashboard/profile">
            <img
              className="h-10 rounded-full border-2 border-blue-500 md:mr-1 cursor-pointer"
              src={
                user.photoURL ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt=""
            /></Link>
          )}
          {user.email ? (
            <button onClick={signOutUser} className="py-2 px-4 bg-sky-500 rounded text-white">
              Sign Out
            </button>
          ) : (
            <Link to="/login" className="py-2 px-4 bg-sky-500 rounded text-white">
              Sign In
            </Link>
          )}
          <div
            onClick={() => setIsMenu(!isMenu)}
            className="text-3xl md:hidden mr-[2px]">
            {isMenu ? <MdClose /> : <IoMdMenu />}
          </div>
        </div>
      </div>
      {isMenu && (
        <div className="absolute right-0 md:hidden">
          <ul className="border p-2 *:p-2 *:border *:mb-px">{lists}</ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
