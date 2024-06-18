import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="mt-10 border-t border-gray-800">
      <div className="py-10">
        <h2 className="font-Bebas text-gray-800 text-center text-4xl border w-fit mx-auto py-1 px-2 rounded">
          Lets Get Started!
        </h2>
        <div className="w-fit mx-auto">
          <Link to={"/"}>
            <img src="/logo.png" alt="" className="h-16" />
          </Link>
        </div>
        <div>{/* Social Links or others stuff here 👈👈 */}</div>
        <p className="font-Bebas text-center text-gray-800">
          All right reserved FitNova © 2024
        </p>
      </div>
    </div>
  );
};

export default Footer;
