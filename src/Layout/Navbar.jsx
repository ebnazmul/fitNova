import { useContext, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { AuthContext } from "../Contexts/AuthContexts";

const Navbar = () => {
  const [isMenu, setIsMenu] = useState(false);
  const lists = (
    <>
      <li>Home</li>
      <li>Trainer</li>
      <li>All Classes</li>
      <li>Dashboard</li>
    </>
  );



  return (
    <div className="max-w-screen-2xl mx-auto mt-4">
      <div className="flex justify-between items-center">
        <img src="/logo.png" alt="" className="h-16" />
        <ul className="hidden md:flex items-center justify-center gap-4 font-semibold hover:*:text-sky-500 hover:*:duration-200 *:cursor-pointer">
          {lists}
        </ul>
        <div className="flex items-center gap-1">
          <button className="py-2 px-4 bg-sky-500 rounded text-white">
            Sign In
          </button>
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
