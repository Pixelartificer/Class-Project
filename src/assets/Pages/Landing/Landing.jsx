import React from "react";
import { Link } from "react-router-dom";
import landing from "../../Image/Landing.png";

const Landing = () => {
  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col justify-center items-center relative">
      <img className="w-full h-full object-cover absolute top-0 left-0 -z-10" src={landing} alt="Landing" />

      {/* Buttons in Top Right Corner */}
      <div className="absolute top-6 right-6 flex flex-col sm:flex-row gap-4">
        <Link to="/signin">
          <button className="px-6 py-3 border-2 border-purple-600 text-purple-600 text-lg font-semibold rounded-lg transition duration-300 hover:bg-purple-600 hover:text-white">
            Sign In
          </button>
        </Link>
        
        <Link to="/signup">
          <button className="px-6 py-3 border-2 border-purple-600 text-purple-600 text-lg font-semibold rounded-lg transition duration-300 hover:bg-purple-600 hover:text-white">
            Sign Up
          </button>
        </Link>
      </div>

      {/* Welcome Note with Stroke Effect and Line Spacing */}
      <h1
        className="text-[50px] sm:text-[70px] md:text-[100px] font-extrabold text-white font-serif drop-shadow-2xl text-center leading-[1.2]"
        style={{ WebkitTextStroke: "2px purple" }}
      >
        Welcome to <br /> Our Platform
      </h1>
    </div>
  );
};

export default Landing;