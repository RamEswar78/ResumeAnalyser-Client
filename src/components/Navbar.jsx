import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { resetResume } from "../redux/resumeSlice";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get current location/URL

  const handleLogout = () => {
    dispatch(resetResume())
    dispatch(logout());
    navigate("/");
  };

  // Function to check if the link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-b from-black/20 to-transparent backdrop-blur-md px-6 py-4 z-50">
      <div className="flex justify-between items-center h-[80px]">
        {/* Left - Logo */}
        <div className="ml-2">
          <img src="/images/Logo.png" alt="Logo" className="w-50" />
        </div>

        {/* Center - Navigation Links */}
        <div className="hidden md:flex justify-between px-30 rounded-[40px] py-4 w-[650px] text-[19px] font-medium shadow-lg">

          <Link 
            to="/" 
            className={`${isActive("/") ? "text-[#7F56D9] font-bold" : ""} hover:text-[#7F56D9] cursor-pointer`}
          >
            Home
          </Link>
          <Link 
            to="/analyser" 
            className={`${isActive("/analyser") ? "text-[#7F56D9] font-bold" : ""} hover:text-[#7F56D9] cursor-pointer`}
          >
            Analyser
          </Link>
          <Link 
            to="/stats" 
            className={`${isActive("/stats") ? "text-[#7F56D9] font-bold" : ""} hover:text-[#7F56D9] cursor-pointer`}
          >
            Stats
          </Link>
          <Link 
            to="/about" 
            className={`${isActive("/about") ? "text-[#7F56D9] font-bold" : ""} hover:text-[#7F56D9] cursor-pointer`}
          >
            About
          </Link>

        </div>

        {/* Right - Auth Buttons */}
        {isLoggedIn ? (
          <div className="hidden md:flex items-center gap-7">
            <Link 
              to="/profile" 
              className={`${isActive("/profile") ? "text-[#7F56D9] font-bold" : ""} text-xl font-medium cursor-pointer`}
            >
              Profile
            </Link>


            <button
              className="block w-full bg-red-500 text-white rounded-xl text-xl px-4 py-2 hover:bg-red-700 font-medium flex items-center gap-2 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>
        ) : (
          <div className="hidden md:flex items-center gap-7">
            <Link 
              to="/login" 
              className={`${isActive("/login") ? "text-[#7F56D9] font-bold" : ""} text-xl font-medium cursor-pointer`}
            >
              Log in
            </Link>
            <Link
              to="/login"
              className="text-xl font-medium text-white bg-[#7F56D9] py-3 px-5 rounded-xl cursor-pointer hover:bg-[#6B47C6]"
            >
              Sign up
            </Link>
          </div>
        )}

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden flex flex-col items-center bg-white py-4 shadow-lg rounded-xl transition-all duration-300 ease-in-out ${
          open ? "block" : "hidden"
        }`}
      >
        <Link 
          to="/" 
          className={`py-2 ${isActive("/") ? "text-[#7F56D9] font-bold" : ""} hover:text-[#7F56D9] cursor-pointer`}
        >
          Home
        </Link>
        <Link 
          to="/analyser" 
          className={`py-2 ${isActive("/analyser") ? "text-[#7F56D9] font-bold" : ""} hover:text-[#7F56D9] cursor-pointer`}
        >
          Analyser
        </Link>
        <Link 
          to="/stats" 
          className={`py-2 ${isActive("/stats") ? "text-[#7F56D9] font-bold" : ""} hover:text-[#7F56D9] cursor-pointer`}
        >
          Stats
        </Link>
        <Link 
          to="/about" 
          className={`py-2 ${isActive("/about") ? "text-[#7F56D9] font-bold" : ""} hover:text-[#7F56D9] cursor-pointer`}
        >
          About
        </Link>

        {isLoggedIn ? (
          <>
            <Link 
              to="/profile" 
              className={`py-2 ${isActive("/profile") ? "text-[#7F56D9] font-bold" : ""} hover:text-[#7F56D9] cursor-pointer`}
            >
              Profile
            </Link>
            <button
              className="py-2 text-xl font-medium text-red-600 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link 
              to="/login" 
              className={`py-2 ${isActive("/login") ? "text-[#7F56D9] font-bold" : ""} text-xl font-medium cursor-pointer`}
            >
              Log in
            </Link>
            <Link
              to="/login"
              className="py-2 text-xl font-medium text-white bg-[#7F56D9] px-6 rounded-xl cursor-pointer hover:bg-[#6B47C6]"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;